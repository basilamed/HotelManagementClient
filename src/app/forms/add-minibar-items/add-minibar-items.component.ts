import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService, SaveItem } from 'src/app/services/items.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';

@Component({
  selector: 'app-add-minibar-items',
  templateUrl: './add-minibar-items.component.html',
  styleUrls: ['./add-minibar-items.component.css']
})
export class AddMinibarItemsComponent {

  id: number = 0;

constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ItemsService: ItemsService,
    private dialog : MatDialog
  ) {}

  form = new FormGroup({  
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });
  async openConfirmationDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationComponent);
    try {
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        await this.addItem();
        this.router.navigate([`/acc`]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  get Name() {
    return this.form.get('name');
  }
  get Code() {
    return this.form.get('code');
  }
  get Price() {
    return this.form.get('price');
  }
  async addItem() {
    const Item: SaveItem = {
      name: (this.Name?.value ?? ''),
      code: (this.Code?.value ?? ''),
      price: +(this.Price?.value ?? 0),
    };
    try {
      const result = await this.ItemsService.addItem(Item).toPromise();
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    this.ItemsService.addItem(Item).subscribe(data => {
      this.router.navigate(['/acc']);
    })
  }
} 
