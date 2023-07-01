import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent {

  id: string = '';
  reservations: any[] = [];

  constructor(private router: ActivatedRoute,
     private reservationService: ReservationService, 
     private Router: Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ?? '');
      this.reservationService.getReservationsByUserId(this.id).subscribe(data => {
        this.reservations = data as any[];
        console.log(this.reservations);
      })
    })
  }
  OpenReceipt(id: Number) {
    this.Router.navigate(['/receipt', id]);
  }

}
