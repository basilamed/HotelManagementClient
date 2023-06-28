import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { CharacteristicService, Characteristic } from 'src/app/services/characteristic.service';

@Component({
  selector: 'app-add-characteristic',
  templateUrl: './add-characteristic.component.html',
  styleUrls: ['./add-characteristic.component.css']
})
export class AddCharacteristicComponent {

  constructor(
    private router: Router,
    public CharacteristicService: CharacteristicService,
    private route: ActivatedRoute,
    private dialog : MatDialog
  ) {}  

  form = new FormGroup({  
    name: new FormControl('', [Validators.required]),
  });

  async openConfirmationDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationComponent);
    try {
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        await this.addCharacteristic();
        this.router.navigate([`/characteristics`]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  get Name() {
    return this.form.get('name');
  }

  async addCharacteristic() {
      
      const characteristic: Characteristic = {
      name: (this.Name?.value ?? ''), 
    };
  
        this.CharacteristicService.addCharacteristic(characteristic).subscribe(data => {
          console.log(data);
          this.router.navigate(['/characteristics']);
        })
      }
}
