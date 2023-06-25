import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  userDetails: any = {}
  id: string = '';
  user: any = [];

  constructor(private router: ActivatedRoute, public UserService: UserService,
     public userService : UserService, public Router : Router, 
     public dialog : MatDialog) { }

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

    openConfirmationDialog(): void {
      const dialogRef = this.dialog.open(ConfirmationComponent);
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.delete();
          this.Router.navigate([`/`]);
        }
      });
    }

    delete(){
      this.UserService.deleteUser(this.id).subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      })
    }
  

}
