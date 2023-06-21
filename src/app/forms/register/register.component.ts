import { Component } from '@angular/core';
import { FormControl,FormArray, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from './email.validators';
import { CustomValidatorP } from './password.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  error: boolean = false;
  //constructor(private userService: UserService, @Inject(Router) private router: Router) { }

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
  console.log(this.form.value)
}
}
 