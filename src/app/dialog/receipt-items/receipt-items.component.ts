import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

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
  selectedItem: any = null;
  
  form = new FormGroup({  
    item: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(
    private router: Router,
    public itemsService: ItemsService,
    private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit(): void {
    // this.itemsService.getReservationItems(this.data.id).subscribe(data => {
    //   this.items = data as any;
    //   this.selectedItem = this.items.length > 0 ? this.items[0] : null;
    //   console.log(this.items)
    // })
  }


  

  get Item() {
    return this.form.get('item');
  }
  get Amount() {
    return this.form.get('amount');
  }

  

}
