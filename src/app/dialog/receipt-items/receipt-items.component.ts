import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { MinibarService } from 'src/app/services/minibar.service';
import  { maxAmountValidator } from './custom.validators';

@Component({
  selector: 'app-receipt-items',
  templateUrl: './receipt-items.component.html',
  styleUrls: ['./receipt-items.component.css']
})
export class ReceiptItemsComponent implements OnInit{
  id: number = 0;
  items: any[] = [];
  minibarDetails: any = {};
  inventar : number = 0;
  selectedItem: any = {};
  
  form = new FormGroup({  
    item: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000)]),
  });

 /* updateValidator(): void {
    this.form.setValidators([
      Validators.required,
      maxAmountValidator(this.selectedAmount)
    ]);
    this.form.updateValueAndValidity();
  }
*/
  onSelectionChange(event: Event): void {
    /*this.selectedAmount = amount;
    this.updateValidator();*/
    const selectedValue: String = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);
    
this.selectedItem = this.minibarDetails.minibar_Items.find((item: any) => item.id.toString() === selectedValue.toString());
console.log(this.selectedItem);
  }

  constructor(
    private router: Router,
    public itemsService: ItemsService,
    private route: ActivatedRoute,
    private MinibarService : MinibarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
    // this.itemsService.getReservationItems(this.data.id).subscribe(data => {
    //   this.items = data as any;
    //   this.selectedItem = this.items.length > 0 ? this.items[0] : null;
    //   console.log(this.items)
    // })
    this.minibarDetails = this.data.minibarDetails;
    console.log(this.minibarDetails.minibar_Items);
  }


  get Item() {
    return this.form.get('item');
  }
  get Amount() {
    return this.form.get('amount');
  }
 
  

}
