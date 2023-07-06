import { Component } from '@angular/core';
import { FormControl,FormArray, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from './email.validators';
import { CustomValidatorP } from './password.validators';
import { RegisterDto, UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  error: boolean = false;
  loading = false;
  constructor(private userService: UserService, private router: Router) { }

  form = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.minLength(3), CustomValidator.cannotContaintSpace]),
    lname: new FormControl('', [Validators.required, Validators.minLength(3), CustomValidator.cannotContaintSpace]),
    email: new FormControl('', [Validators.required, Validators.minLength(3), CustomValidator.cannotContaintSpace , CustomValidator.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), 
      CustomValidatorP.cannotContaintSpace, CustomValidatorP.number,CustomValidatorP.specialCaracter, CustomValidatorP.upperCase]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
  }, 
  {
    validators:CustomValidatorP.passwordMismatch
  })
get Fname() { 
  return this.form.get('fname');
}
get Lname() { 
  return this.form.get('lname');
}
  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }
  get ConfirmPassword(){
    return this.form.get('confirmPassword');
  }

login (){
  if(this.form.valid){
    const dto: RegisterDto = {
      firstName: this.Fname?.value ?? '',
      lastName: this.Lname?.value ?? '',
      userName: this.Email?.value ?? '',
      password: this.Password?.value ?? '',
      roleId: +(document.getElementById('role') as HTMLInputElement).value
    }
    this.loading = true;
    this.userService.register(dto).subscribe((data: any) => {
      console.log('User registered successfully:', data);
      if(dto.roleId === 2){
        this.router.navigate(['/login'] , { queryParams: { success: 'true' } });
      }
      else{
        this.router.navigate(['/login'] , { queryParams: { success2: 'true' } });
      }
      this.loading = false;
    },
    (error: any) => {
      console.error('Error registering user:', error);
      this.error = true;
      this.loading = false;
    })
  }
}
}

 