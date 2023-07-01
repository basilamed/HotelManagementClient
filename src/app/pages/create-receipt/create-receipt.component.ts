import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptItemsComponent } from 'src/app/dialog/receipt-items/receipt-items.component';
import { MinibarService } from 'src/app/services/minibar.service';
import { ReceiptService, SaveReceipt } from 'src/app/services/receipt.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ServicesService } from 'src/app/services/services.service';
import { ReceiptServicesComponent } from 'src/app/dialog/receipt-services/receipt-services.component';
import { UserService } from 'src/app/services/user.service';
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
  interval : number = 0;
  date1: string = '';
  date2: string = '';
  services: any = [];


  constructor( public dialog: MatDialog, 
    private route: ActivatedRoute,
    private ReservationService: ReservationService,
    private MinibarService : MinibarService,
    private receiptService: ReceiptService,
    private router: Router,
    private ServiceService:ServicesService,
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id') ?? 0);
      this.ReservationService.getReservationById(this.id).subscribe(data => {
        this.reservationDetails = data;
        this.date1 = this.reservationDetails.checkIn;
        this.date2 = this.reservationDetails.checkOut;
        const datum1 = new Date(this.date1);
        const datum2 = new Date(this.date2);
        const timeDifference = Math.abs(datum2.getTime() - datum1.getTime());
        this.interval = Math.ceil(timeDifference / (1000 * 3600 * 24));
        console.log(this.interval);
        console.log(this.reservationDetails);
        this.minibarId = this.reservationDetails.accommodationUnit.minibarId;
        console.log(this.minibarId);
        this.MinibarService.getMinibarById(this.minibarId).subscribe(data => {
          this.minibarDetails = data;
          console.log(this.minibarDetails);
        })
        this.ServiceService.getServices().subscribe(data => {
          this.services = data;
          console.log(this.services);
        })
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

  openDialogService(){
    const dialogRef = this.dialog.open(ReceiptServicesComponent, {
      data: {id: this.id,
        reservationDetails: this.reservationDetails,
        services: this.services}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
      }
    });
  }

  create(){
    var dto: SaveReceipt = {
      reservationId: this.id
    }
    this.receiptService.createReceipt(dto).subscribe(data => {
      console.log(data);
      this.router.navigate([`receipt/${this.id}`]);
    })
  }
}
