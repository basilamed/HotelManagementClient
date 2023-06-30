import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { AccommodationUnitsService } from 'src/app/services/accommodation-units.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-reservations',
  templateUrl: './approved-reservations.component.html',
  styleUrls: ['./approved-reservations.component.css']
})
export class ApprovedReservationsComponent {

  reservations: any [] = [];
  units: any [] = [];

  constructor(private ReservationService: ReservationService, 
    private router: Router,
  private accommodationUnitService: AccommodationUnitsService) { }

  ngOnInit(): void {
    this.ReservationService.getApprovedReservations().subscribe((res: any) => {
      this.reservations = res;
      console.log(this.reservations)
    })
    this.accommodationUnitService.getAccommodationUnits().subscribe((response: any) => {
      this.units = response;
      console.log(this.units);
    }) 

  }
  getUnitName(unitId: number): string {
    const unit = this.units.find(u => u.id === unitId);
    return unit ? unit.name : 'N/A'; // Return the unit name or 'N/A' if not found
  }

  create(id:number){
    this.router.navigate([`create-receipt/${id}`])
  }

}
