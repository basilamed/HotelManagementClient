import { Component, Inject } from '@angular/core';
import { FormControl,FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error: boolean = false;
  //constructor(private userService: UserService, @Inject(Router) private router: Router) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }
 

}
