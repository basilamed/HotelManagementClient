import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-aprove',
  templateUrl: './user-aprove.component.html',
  styleUrls: ['./user-aprove.component.css']
})
export class UserAproveComponent implements OnInit{

  users: any[] = []
  displayedColumns: string[] = ['ime', 'prezime', 'email', 'dugme1', 'dugme2'];
  constructor(private userSerivce: UserService) { }

  ngOnInit(): void {
    this.userSerivce.getNotApproved().subscribe((response: any) => {
      this.users = response;
      console.log(this.users);
    })
  }

  delete(id: string){
    this.userSerivce.deleteUser(id).subscribe(data => {
      this.ngOnInit();
    })
  }

  update(id: string){
    this.userSerivce.approve(id).subscribe(data => {
      this.ngOnInit();
    })
  }
}
