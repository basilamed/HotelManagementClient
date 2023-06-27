import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/reservation.service';
import { DateFilterFn } from '@angular/material/datepicker';


@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit{

  form!: FormGroup;
  dateControl: FormControl = new FormControl();
  id: number = 0;
  dates: any[] = [];
  disableDates: any[] = [];
  

  minDate!: Date;
  maxDate!: Date;
  

  constructor(private dialogRef: MatDialogRef<DateComponent>, 
    private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private reservationService: ReservationService) 
    { 
      this.id = data.id;
      console.log(this.id);
    }

  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      checkIn: new FormControl('', [Validators.required]),
      checkOut: new FormControl('', [Validators.required])
    });

    this.reservationService.getDateRange(this.id).subscribe(data => {
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

  
  myHolidayFilter: DateFilterFn<Date | null> = (d: Date | null): boolean => {
    if (!d) return false; // No date selected, so filter it out
    return !this.dates.some(date => this.isSameDate(date, d));
  }

  isSameDate(date1: string, date2: Date): boolean {
    const formattedDate = date2.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    return formattedDate === date1;
  }
 
  

  onConfirm(): void {
    // const selectedDate: string = this.form.value.date;
    // const formattedDate: Date = new Date(selectedDate);

    // const date: addApp = {
    //   dateTime: formattedDate,
    //   userId: this.user.id
    // };
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
