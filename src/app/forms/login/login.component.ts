import { Component, Inject, OnInit } from '@angular/core';
import { FormControl,FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
//import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  error: boolean = false;
  success = false;
  success2 = false;
  constructor(private userService: UserService, @Inject(Router) private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const success = params['success'];
      if (success === 'true') {
        this.success = true;
      }
      const success2 = params['success2'];
      if (success2 === 'true') {
        this.success2 = true;
      }
    });
  }

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
 
  login(){
    let formData = this.form.value;
    let credentials = {
      userName: formData.email,
      password: formData.password
    };
    this.userService.login(credentials).subscribe((response: any) => {
      if(response && response.token){
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['']);
      }
    },
    (err) => {
      this.error = true;
      console.log(err);
    }
    );
  }
}
