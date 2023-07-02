import { Component } from '@angular/core';
import { ReceiptService } from 'src/app/services/receipt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent {

  receipts: any[] = [];
  monthlyAmounts: number[] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  constructor(private receiptService: ReceiptService,
     private router: Router) { }

  ngOnInit(): void {
    this.receiptService.getAllReceipts()
      .subscribe((res: any) => {
        this.receipts = res;
        const currentYear = new Date().getFullYear();

        this.monthlyAmounts = Array(12).fill(0);
  
        this.receipts.forEach(receipt => {
          const date = new Date(receipt.reservation.checkOut);
          const year = date.getFullYear();
  
          if (year === currentYear) {
            const month = date.getMonth();
            this.monthlyAmounts[month] += receipt.totalPrice;
          }
        });


      console.log(this.receipts);
      console.log(this.monthlyAmounts);
      });
  }

  OpenReceipt(id: Number) {
    this.router.navigate(['/receipt', id]);
  }

    
  

} 
