
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDto, UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent{
  user: any = {};
  id: string = '';
  imageData: string = "";
  error: boolean = false;


  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })

  constructor(private router: ActivatedRoute, public UserService: UserService,
    public userService : UserService, public dialog: MatDialog, public Router : Router) { }

 ngOnInit(): void {
   this.router.paramMap.subscribe(params => {
     this.id = String(params.get('id') ?? '');
     this.UserService.getUserById(this.id).subscribe(data => {
       this.user = data;
       console.log(this.user)
       this.form.patchValue({
         name: this.user.name,
         surname: this.user.surname
        //image: this.user.image
       })
     })
   })
  }

  async openConfirmationDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationComponent);
    try {
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        await this.deleteUser();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.Router.navigate([`/`]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  get Name() {
    return this.form.get('name');
  }
  get Surname() {
    return this.form.get('surname');
  }

  get Image() {
    return this.form.get('image');
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

  async updateUser(): Promise<void> {
    try {
      if (this.imageData) {
        const formData = new FormData();
        formData.append('image', this.imageData);
        const d: UpdateDto = {
          firstName: this.Name?.value ?? '',
          image: this.imageData,
          lastName: this.Surname?.value ?? '',
        };
        console.log(d);
        await this.UserService.updateUser(this.id, d).toPromise();
        this.Router.navigate([`/editUser/${this.id}`]);
      } else {
        const d: UpdateDto = {
          firstName: this.Name?.value ?? '',
          lastName: this.Surname?.value ?? '',
          image: this.user.image,
        };
        console.log(d);
        await this.UserService.updateUser(this.id, d).toPromise();
        this.Router.navigate([`/editUser/${this.id}`]);
      }
    } catch (error) {
      console.log(error);
      this.error = true;
    }
  }

  deleteUser(){ 
    return this.UserService.deleteUser(this.id);
  }
  

}