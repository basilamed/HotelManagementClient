import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  userDetails: any = {}
  id: string = '';
  user: any = [];

  constructor(private router: ActivatedRoute, public UserService: UserService, public userService : UserService, public Router : Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ?? '');
      this.UserService.getUserById(this.id).subscribe(data => {
        this.userDetails = data;
        console.log(this.userDetails)
      },
        err => {
          console.log(err)
          })
      
    })
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }}

}
