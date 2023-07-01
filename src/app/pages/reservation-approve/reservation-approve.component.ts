import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import { AccommodationUnitsService } from 'src/app/services/accommodation-units.service';

@Component({
  selector: 'app-reservation-approve',
  templateUrl: './reservation-approve.component.html',
  styleUrls: ['./reservation-approve.component.css']
})
export class ReservationApproveComponent {

  reservations: any[] = []
  users: any[] = []
  units: any[] = []
  displayedColumns: string[] = ['datum_od', 'datum_do', 'ime_korisnika', 'jedinica','dugme1', 'dugme2'];

constructor(
  private reservationService: ReservationService, 
  private userService: UserService, 
  private accommodationUnitService: AccommodationUnitsService) { }


  ngOnInit(): void {
    this.reservationService.getReservationsWithoutReceit().subscribe((response: any) => {
      this.reservations = response;
      console.log(this.reservations);
    })
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response;
      console.log(this.users);
    })
    this.accommodationUnitService.getAccommodationUnits().subscribe((response: any) => {
      this.units = response;
      console.log(this.units);
    })    
  }

  delete(id: number){
    this.reservationService.deleteReservation(id).subscribe(data => {
      this.ngOnInit();
    })
  }
  update(id: number){
    this.reservationService.acceptReservation(id).subscribe(data => {
      this.ngOnInit();
    })
  }
   getUnitName(unitId: number): string {
    const unit = this.units.find(u => u.id === unitId);
    return unit ? unit.name : 'N/A'; // Return the unit name or 'N/A' if not found
  }
  getUserName(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.firstName : 'N/A'; // Return the unit name or 'N/A' if not found
  }
  getUserSurname(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.lastName : 'N/A'; // Return the unit name or 'N/A' if not found
  }
} 
