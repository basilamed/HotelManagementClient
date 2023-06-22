import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationUnitsService } from 'src/app/services/accommodation-units.service';


@Component({
  selector: 'app-accommodation-unit-details',
  templateUrl: './accommodation-unit-details.component.html',
  styleUrls: ['./accommodation-unit-details.component.css']
})
export class AccommodationUnitDetailsComponent {

  accommodationUnit: any = {}
  id: number = 0;

  constructor(private router: ActivatedRoute, private AccommodationUnitsService: AccommodationUnitsService) { }

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
  }


}
