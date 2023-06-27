import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { MinibarService, AddMinibar } from 'src/app/services/minibar.service';

@Component({
  selector: 'app-add-minibar',
  templateUrl: './add-minibar.component.html',
  styleUrls: ['./add-minibar.component.css']
})
export class AddMinibarComponent {

  id: number = 0;

  constructor(
    private router: Router,
    public MinibarService: MinibarService,
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
        await this.addMinibar();
        this.router.navigate([`/minibars`]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  get Name() {
    return this.form.get('name');
  }

  async addMinibar() {
    
    // Pronađite liniju gde formirate objekat AccommodationUnit
    const minibar: AddMinibar = {
     name: (this.Name?.value ?? ''), 
   };
 
       this.MinibarService.addMinibar(minibar).subscribe(data => {
         console.log(data);
         this.router.navigate(['/minibars']);
       })
     }
}
