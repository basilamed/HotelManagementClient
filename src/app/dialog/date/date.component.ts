import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/reservation.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { Router } from '@angular/router';


@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  form!: FormGroup;
  id: number = 0;
  dates: any[] = [];
  // disableDates: any[] = [];

  constructor(private dialogRef: MatDialogRef<DateComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reservationService: ReservationService,
    private router: Router) {
    this.id = data.id;
    console.log(this.id);
    
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      checkIn: new FormControl('', [Validators.required]),
      checkOut: new FormControl('', [Validators.required])
    });
  
    this.reservationService.getDateRange(this.id).toPromise().then(data => {
      if (Array.isArray(data)) {
        this.dates = data.map((dateStr: string) => {
          const date = new Date(dateStr);
          const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
          return formattedDate;
        });
        console.log(this.dates);
      }
    });
  }
  

  rangeFilter = (date: Date): boolean => {
    const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

    if (this.dates.includes(formattedDate)) {
      return false; // Onemogući izbor datuma koji je onemogućen
    }
  
    // Provera za odabrane datume u opsegu
    const startDate = this.form.controls['checkIn'].value;
    const endDate = this.form.controls['checkOut'].value;

    if (date < new Date()) {
      return false; // Onemogući izbor datuma ako je manji od trenutnog datuma
    }
  
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      // Proveri da li postoji barem jedan onemogućeni datum između start i end datuma
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const formattedD = d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        if (this.dates.includes(formattedD)) {
          return false; // Onemogući izbor datuma ako postoji onemogućeni datum u opsegu
        }
      }
    }
  
    return true; 
  }

  onConfirm(): void {
    // Retrieve the selected date range from the form
    const startDate: string = this.form.get('checkIn')!.value;
    const endDate: string = this.form.get('checkOut')!.value;
  
    // Convert the selected date strings to Date objects
    const formattedStartDate: Date = new Date(startDate);
    const formattedEndDate: Date = new Date(endDate);
  
    // Format the dates as "yyyy-mm-dd"
    const formattedStartDateStr: string = formattedStartDate.toISOString().split('T')[0];
    const formattedEndDateStr: string = formattedEndDate.toISOString().split('T')[0];
  
    this.router.navigate([`request/${this.id}/${formattedStartDateStr}/${formattedEndDateStr}`]);
  
    // Rest of your code...
    this.dialogRef.close();
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
