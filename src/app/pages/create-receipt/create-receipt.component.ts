import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ReceiptItemsComponent } from 'src/app/dialog/receipt-items/receipt-items.component';
import { MinibarService } from 'src/app/services/minibar.service';
import { ReservationService } from 'src/app/services/reservation.service';
@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.css']
})
export class CreateReceiptComponent implements OnInit{

  id: number = 0;
  reservationDetails: any = {};
  minibarId: number = 0;
  minibarDetails: any = {};


  constructor( public dialog: MatDialog, 
    private route: ActivatedRoute,
    private ReservationService: ReservationService,
    private MinibarService : MinibarService,
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id') ?? 0);
      this.ReservationService.getReservationById(this.id).subscribe(data => {
        this.reservationDetails = data;
        console.log(this.reservationDetails);
        this.minibarId = this.reservationDetails.accommodationUnit.minibarId;
        console.log(this.minibarId);
        this.MinibarService.getMinibarById(this.minibarId).subscribe(data => {
          this.minibarDetails = data;
          console.log(this.minibarDetails);
        });
      }
    )});
  }

  openDialog(){
    const dialogRef = this.dialog.open(ReceiptItemsComponent, {
      data: {id: this.id, 
        minibarId: this.minibarId, 
        minibarDetails: this.minibarDetails, 
        reservationDetails: this.reservationDetails}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
      }
    });
  }
}
