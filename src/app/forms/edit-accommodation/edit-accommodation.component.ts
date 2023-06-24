import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationUnitsService, UpdateAccommodationUnit, SaveAccommodationUnit} from 'src/app/services/accommodation-units.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css']
})
export class EditAccommodationComponent{

  accommodationUnit: any = {}
  id: number = 0;
  user: any = [];
  imageData: string = "";
  error: boolean = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    floor: new FormControl('', [Validators.required, Validators.min(2), Validators.max(6)]),
    capacity: new FormControl('', [Validators.required, Validators.min(1), Validators.max(7)]),
    description: new FormControl('', [Validators.required])
  })

  
  constructor(private router: ActivatedRoute, public AccommodationUnitsService: AccommodationUnitsService,
     public userService : UserService, public dialog: MatDialog, public Router : Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = Number(params.get('id') ?? 0);
      this.AccommodationUnitsService.getAccommodationUnitById(this.id).subscribe(data => {
        this.accommodationUnit = data;
        console.log(this.accommodationUnit)
        this.form.patchValue({
          name: this.accommodationUnit.name,
          type: this.accommodationUnit.type,
          floor: this.accommodationUnit.floor,
          capacity: this.accommodationUnit.capacity,
          description: this.accommodationUnit.description,
          image: this.accommodationUnit.image
        })
      })
    })

  }
  async openConfirmationDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationComponent);
    try {
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        await this.updateAccommodationUnit();
        this.Router.navigate([`/`]);
      }
    } catch (error) {
      console.log(error);
    }
  }
    get Name() {
      return this.form.get('name');
    }
  
    get Type() {
      return this.form.get('type');
    }
  
    get Image() {
      return this.form.get('image');
    }
  
    get Floor() {
      return this.form.get('floor');
    }
  
    get Capacity() {
      return this.form.get('capacity');
    }
  
    get Description() {
      return this.form.get('description');
    }
  
    onImageSelected(event: any) {
      const file: File = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  
    dataURItoBlob(dataURI: string): Blob {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
  
    async updateAccommodationUnit(): Promise<void> {
      try {
        if (this.imageData) {
          const formData = new FormData();
          formData.append('image', this.imageData);
          const d: UpdateAccommodationUnit = {
            name: this.Name?.value ?? '',
            capacity: +(this.Capacity?.value ?? 0),
            image: this.imageData,
            type: this.Type?.value ?? '',
            description: this.Description?.value ?? '',
            floor: +(this.Floor?.value ?? 0)
          };
          console.log(d);
          await this.AccommodationUnitsService.updateAccommodationUnit(d, this.id).toPromise();
          this.Router.navigate([`/acc/${this.id}`]);
        } else {
          const d: UpdateAccommodationUnit = {
            name: this.Name?.value ?? '',
            capacity: +(this.Capacity?.value ?? 0),
            image: this.accommodationUnit.image,
            type: this.Type?.value ?? '',
            description: this.Description?.value ?? '',
            floor: +(this.Floor?.value ?? 0),
          };
          console.log(d);
          await this.AccommodationUnitsService.updateAccommodationUnit(d, this.id).toPromise();
          this.Router.navigate([`/acc/${this.id}`]);
        }
      } catch (error) {
        console.log(error);
        this.error = true;
      }
    }
    

}
