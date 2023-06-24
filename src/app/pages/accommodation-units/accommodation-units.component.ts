import { Component } from '@angular/core';
import { AccommodationUnitsService } from 'src/app/services/accommodation-units.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accommodation-units',
  templateUrl: './accommodation-units.component.html',
  styleUrls: ['./accommodation-units.component.css']
})
export class AccommodationUnitsComponent {
  units: any [] = [];
 
  constructor(private servise: AccommodationUnitsService, private router: Router) { }

  ngOnInit(): void {
    this.servise.getAccommodationUnits().subscribe((res: any) => {
      this.units = res;
      console.log(this.units)
    },
    err => {
      console.log(err)
    })
  } 

  openInfo(id: number){
    this.router.navigate([`/acc/${id}`])
  }


}
