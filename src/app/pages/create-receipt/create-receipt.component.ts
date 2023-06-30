import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ReceiptItemsComponent } from 'src/app/dialog/receipt-items/receipt-items.component';

@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.css']
})
export class CreateReceiptComponent implements OnInit{

  id: number = 0;
  constructor( public dialog: MatDialog, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id') ?? 0);
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(ReceiptItemsComponent, {
      data: {id: this.id}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
      }
    });
  }
}
