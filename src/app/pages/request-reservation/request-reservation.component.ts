import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { PriceService } from 'src/app/services/price.service';
import { DatePipe } from '@angular/common';
import { AccommodationUnitsService } from 'src/app/services/accommodation-units.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { ReservationService, AddReservation } from 'src/app/services/reservation.service';
@Component({
  selector: 'app-request-reservation',
  templateUrl: './request-reservation.component.html',
  styleUrls: ['./request-reservation.component.css'],
  providers: [DatePipe] // Dodajte DatePipe kao provajder
})
export class RequestReservationComponent implements OnInit {

  constructor(private priceService: PriceService,
     private route: ActivatedRoute, private datepipe: DatePipe, 
     private unitService: AccommodationUnitsService,
     private FormBuilder : FormBuilder,
     private ServicesService: ServicesService,
     private ReservationService: ReservationService,
     private Route: Router) {}

  id: number = 0;
  checkIn!: Date;
  price: any = [];
  panelOpenState = false;
  unit: any = [];
  date1: string = '';
  date2: string = '';
  user: any = [];
  services: any = [];
  formC!: FormGroup;
  numberOfDays: number = 1;
  
  form = new FormGroup({
    numberOfPeople: new FormControl('', Validators.required)
  });

  get Number(){
    return this.form.get('numberOfPeople')
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.id = Number(data.get('accId') ?? 0);
      console.log(this.id);
      this.date1 = data.get('checkIn') ?? '';
      this.date2 = data.get('checkOut') ?? '';
      console.log(this.date1);
      console.log(this.date2);
      const datum1 = new Date(this.date1);
      const datum2 = new Date(this.date2);
      const timeDifference = Math.abs(datum2.getTime() - datum1.getTime());
      this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      console.log(this.numberOfDays);
      const checkInValue: string = data.get('checkIn') ?? '';
      const formattedCheckIn: Date = new Date(checkInValue);
      const formattedDate: string = this.datepipe.transform(formattedCheckIn, 'yyyy-MM-dd') || '';
      console.log(formattedDate);
      this.priceService.getPriceForUnit(this.id, formattedDate).subscribe(data => {
        this.price = data as any;
        console.log(this.price);
        console.log(this.price.accommodationUnit.capacity)
      });
      this.unitService.getAccommodationUnitById(this.id).subscribe(data => {
        this.unit = data as any;
        console.log(this.unit.capacity);
        this.form.get('numberOfPeople')?.setValidators([Validators.required, Validators.max(this.price.accommodationUnit.capacity)]);
        this.form.get('numberOfPeople')?.updateValueAndValidity();
      });
    });

    

    this.formC = this.FormBuilder.group({
      servicesId: this.FormBuilder.array([])
    });

    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }

    this.ServicesService.getServices().subscribe((data: any) => {
      this.services = data;
  
      const servicesFormArray = this.formC.get('servicesId') as FormArray;
  
      this.services.forEach(() => {
        const control = new FormControl(false);
        servicesFormArray.push(control);
      });
  
      console.log(this.services);
    },
    err => {
      console.log(err);
    });
  }

  get servicesIdArray() {
    return this.formC.get('servicesId');
  }

  requestReservation(){
    
    const selectedServices = this.formC.get('servicesId') as FormArray;
    const selectedValues: number[] = [];
  
    selectedServices.controls.forEach((control, i) => {
      if (control.value) {
        selectedValues.push(this.services[i].id);
      }
    });

    console.log(selectedValues);


    const Reservation : AddReservation = {
      checkIn: new Date(this.date1),
      checkOut: new Date(this.date2),
      numberOfPeople: +(this.form.value.numberOfPeople ?? 0),
      accommodationUnitId: this.id,
      userId: this.user.id,
      serviceIds: selectedValues
    }

    console.log(Reservation);
    
    this.ReservationService.requestReservation(Reservation).subscribe(data => {
      console.log(data);
      this.Route.navigate(['/acc']);
    })
  }
  
}
