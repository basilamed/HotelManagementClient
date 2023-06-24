import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any [] = [];

  constructor(private UserService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.UserService.getAllUsers().subscribe((res: any) => {
      this.users = res;
      console.log(this.users)
    },
    err => {
      console.log(err)
    })
  } 

  openInfo(id: number){
    this.router.navigate([`/user/${id}`])
  }
}
