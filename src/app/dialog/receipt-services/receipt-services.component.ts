import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReceiptService, SaveResItem } from 'src/app/services/receipt.service';
import { ServicesService } from 'src/app/services/services.service';
import { ReservationService, ReservationServiceRS } from 'src/app/services/reservation.service';

interface Service {
  id: number;
  name: string;
  price: number;
  methodOfPayment: boolean | null;
  services_Reservations: any;
}

@Component({
  selector: 'app-receipt-services',
  templateUrl: './receipt-services.component.html',
  styleUrls: ['./receipt-services.component.css']
})
export class ReceiptServicesComponent {
  services: any = [];
  filteredServices: Service[] = [];

  formC = new FormGroup({
    item: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReceiptServicesComponent>,
    private ServicesService: ServicesService ,
    private ReservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.ServicesService.getServices().subscribe(data => {
      this.services = data as any;
      this.filteredServices = this.services.filter((s : Service) => s.methodOfPayment === false);
      console.log(this.filteredServices);
    });
  }

  get Item() {
    return this.formC.get('item');
  }

  get Amount() {
    return this.formC.get('amount');
  }

  addItem() {
    var dto: ReservationServiceRS = {
      serviceId: +(document.getElementById('item') as HTMLInputElement).value,
      reservationId: this.data.id ?? 0,
      uses: +(this.formC.value.amount ?? 0)
    };

    this.ReservationService.addService(dto).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );

    this.dialogRef.close();
  }
}
