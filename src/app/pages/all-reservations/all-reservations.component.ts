import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Router } from '@angular/router';
import { AccommodationUnitsService } from 'src/app/services/accommodation-units.service';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent {

  reservations: any [] = [];
  units: any [] = [];


  constructor(private reservationService: ReservationService,
    private router: Router,
    private accommodationUnitService: AccommodationUnitsService,) { }

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe((res: any) => {
      this.reservations = res;
      console.log(this.reservations)
    },
    err => {
      console.log(err)
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

  OpenReceipt(id: Number) {
    this.router.navigate(['/receipt', id]);
  }

  OpenInfo(id: Number) {
    this.router.navigate(['/acc', id]);
  }

}
