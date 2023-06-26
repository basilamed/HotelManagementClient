import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { ItemsService , ItemMinibar} from 'src/app/services/items.service';
import { MinibarService } from 'src/app/services/minibar.service';

interface item {
  id: number;
  name: string;
  code : string;
  price: number;
  minibar_Items: any[];
}
@Component({
  selector: 'app-add-to-minibar',
  templateUrl: './add-to-minibar.component.html',
  styleUrls: ['./add-to-minibar.component.css']
})
export class AddToMinibarComponent {
  id: number = 0;
  items: item [] = [];
  
  form = new FormGroup({  
    item: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(7)]),
  });

  constructor(
    private router: Router,
    private MinibarService: MinibarService,
    public ItemsService: ItemsService,
    private route: ActivatedRoute,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +(params.get('id') ?? 0);
    });

  this.ItemsService.getItems().subscribe(
    (res: any) => {
      this.items = res;
      console.log(this.items);
    },
    err => {
      console.log(err);
    }
  );}

  get Item() {
    return this.form.get('item');
  }
  get Amount() {
    return this.form.get('amount');
  }
  async openConfirmationDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationComponent);
    try {
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        await this.addToMinibar();
        this.router.navigate([`/`]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  addToMinibar(){

    const minibarItem: ItemMinibar = {
      itemId: +(this.Item?.value ?? 0),
      amount: +(this.Amount?.value ?? 0),
      minibarId: this.id

  };
  console.log(minibarItem);
  this.MinibarService.addItem(minibarItem).subscribe(data => {
    console.log(data);
    this.router.navigate(['/minibar/' + this.id]);
  })
}
}
