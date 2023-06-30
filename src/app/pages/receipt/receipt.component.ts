import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from 'src/app/services/receipt.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{

  receipt: any = [];
  id: number = 0;
  constructor(private receiptService: ReceiptService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id') ?? 0);
      this.receiptService.getReceiptByResId(this.id).subscribe(data => {
        this.receipt = data;
        console.log(this.receipt);
      });
    });
  }
}
