import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationUnitsService} from 'src/app/services/accommodation-units.service';
import { UserService } from 'src/app/services/user.service';
import { OnInit } from '@angular/core';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accommodation-unit-details',
  templateUrl: './accommodation-unit-details.component.html',
  styleUrls: ['./accommodation-unit-details.component.css']
})
export class AccommodationUnitDetailsComponent implements OnInit {

  accommodationUnit: any = {}
  id: number = 0;
  user: any = [];

  constructor(private router: ActivatedRoute,
     public AccommodationUnitsService: AccommodationUnitsService,
      public userService : UserService, public dialog: MatDialog, 
      public Router : Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = Number(params.get('id') ?? 0);
      this.AccommodationUnitsService.getAccommodationUnitById(this.id).subscribe(data => {
        this.accommodationUnit = data;
        console.log(this.accommodationUnit)
      },
        err => {
          console.log(err)
          })
      
    })

    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
  }
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
        this.Router.navigate([`/acc`]);
      }
    });
  }

  delete(){
    this.AccommodationUnitsService.deleteAccommodationUnit(this.id).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

  Update(){
    this.Router.navigate(['editAcc/' + this.id]);
  }
  addPrice(){
    this.Router.navigate(['addPrice/' + this.id]);
  }
 


}
