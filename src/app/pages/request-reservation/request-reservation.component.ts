import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PriceService } from 'src/app/services/price.service';
import { DatePipe } from '@angular/common';
import { AccommodationUnitsService } from 'src/app/services/accommodation-units.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-reservation',
  templateUrl: './request-reservation.component.html',
  styleUrls: ['./request-reservation.component.css'],
  providers: [DatePipe] // Dodajte DatePipe kao provajder
})
export class RequestReservationComponent implements OnInit {

  constructor(private priceService: PriceService, private route: ActivatedRoute, private datepipe: DatePipe, private unitService: AccommodationUnitsService) {}

  id: number = 0;
  checkIn!: Date;
  price: any = [];
  panelOpenState = false;
  unit: any = [];
  date1: string = '';
  date2: string = '';
  user: any = [];
  
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
        console.log(this.unit.numberOfPeople);
        this.form.get('numberOfPeople')?.setValidators([Validators.required, Validators.max(this.price.accommodationUnit.capacity)]);
        this.form.get('numberOfPeople')?.updateValueAndValidity();
      });
    });

    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
  }
}
