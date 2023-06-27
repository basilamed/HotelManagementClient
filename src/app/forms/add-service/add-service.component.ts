import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { ServicesService, AddService } from 'src/app/services/services.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent {


 id: number = 0;

  constructor(
    private router: Router,
    public ServiceService: ServicesService,
    private route: ActivatedRoute,
    private dialog : MatDialog
  ) {}

  form = new FormGroup({  
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  async openConfirmationDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationComponent);
    try {
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        await this.addService();
        this.router.navigate([`/services`]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  get Name() {
    return this.form.get('name');
  }
  get Price() {
    return this.form.get('price');
  }
  async addService() {
    
    // Pronađite liniju gde formirate objekat AccommodationUnit
    const service: AddService = {
     name: (this.Name?.value ?? ''),
    price: +(this.Price?.value ?? 0), 
   };
 
       this.ServiceService.addService(service).subscribe(data => {
         console.log(data);
         this.router.navigate(['/services']);
       })
     }
}
