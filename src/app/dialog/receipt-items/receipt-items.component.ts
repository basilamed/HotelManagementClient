import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemsService } from 'src/app/services/items.service';
import { ReceiptService, SaveResItem } from 'src/app/services/receipt.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-receipt-items',
  templateUrl: './receipt-items.component.html',
  styleUrls: ['./receipt-items.component.css']
})
export class ReceiptItemsComponent implements OnInit {
  items: any[] = [];
  minibarDetails: any = {};
  selectedItem: any = {};
  selectedAmount = 0;

  form = new FormGroup({
    item: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(
    private itemsService: ItemsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private receiptService: ReceiptService,
    private dialogRef: MatDialogRef<ReceiptItemsComponent>
  ) {}

  ngOnInit(): void {
    this.itemsService.getReservationItems(this.data.id).subscribe(data => {
      this.items = data as any;
      this.selectedItem = this.items.length > 0 ? this.items[0] : null;
    });
    this.minibarDetails = this.data.minibarDetails;
  }

  onSelectionChange(event: Event): void {
    const selectedValue: string = (event.target as HTMLSelectElement).value;
    this.selectedItem = this.minibarDetails.minibar_Items.find(
      (item: any) => item.item.id.toString() === selectedValue
    );
    this.selectedAmount = this.selectedItem?.amount || 0;
    this.updateValidator();
  }

  updateValidator(): void {
    const maxAmount = this.selectedItem?.amount || 0;
    this.form.get('amount')?.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(maxAmount)
    ]);
    this.form.get('amount')?.updateValueAndValidity();
  }

  get Item() {
    return this.form.get('item');
  }

  get Amount() {
    return this.form.get('amount');
  }

  addItem(){
    var dto: SaveResItem = {
      itemId: +(document.getElementById('item') as HTMLInputElement).value,
      reservationId: this.data.id ?? 0,
      amount: +(this.form.value.amount ?? 0) 
    }
    this.receiptService.addResItems(dto).subscribe(data => {
      console.log(data);
    },
    (err) => {
      console.log(err);
    })

    this.dialogRef.close();
  }
}
