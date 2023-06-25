import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  user: any = [];
  constructor(public userService:UserService, public router: Router) {}

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
  }

  logout(){
    this.userService.logout();
  }
  openInfo(id: number){
    this.router.navigate([`/editProfile/${id}`])
  }
  ChangePassword(id: number){
    this.router.navigate([`/changepw/${id}`])
  }
  
}
 