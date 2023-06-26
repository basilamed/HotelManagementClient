import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationUnitsService} from 'src/app/services/accommodation-units.service';
import { PriceService, SavePrice } from 'src/app/services/price.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';


@Component({ 
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.css']
})


export class AddPriceComponent {
  id: number = 0;
  units: any [] = [];

  constructor(
    private router: Router,
    public AccommodationUnitsService: AccommodationUnitsService,
    private route: ActivatedRoute,
    private PriceService: PriceService,
    private dialog : MatDialog
  ) {}

  form = new FormGroup({  
    pricePerPerson: new FormControl('', [Validators.required]),
    pricePerNight: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });
 

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id') ?? 0);}
      );  
    }
  
  async openConfirmationDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationComponent);
    try {
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        await this.addPrice();
        this.router.navigate([`/`]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  get PricePerPerson() {
    return this.form.get('pricePerPerson');
  }
  get PricePerNight() {
    return this.form.get('pricePerNight');
  }
  get StartDate() {
    return this.form.get('startDate');
  }
  get EndDate() {
    return this.form.get('endDate');
  }

  async addPrice() {
    
   // Pronađite liniju gde formirate objekat AccommodationUnit
   const Price: SavePrice = {
    pricePerPerson: +(this.PricePerPerson?.value ?? 0),
    pricePerNight: +(this.PricePerNight?.value ?? 0),
    periodOf: new Date(this.StartDate?.value ?? ''),
    periodTo: new Date(this.EndDate?.value ?? ''),
    accommodationUnitId: this.id ?? 0,  
  };

      this.PriceService.addPrice(Price).subscribe(data => {
        console.log(data);
        this.router.navigate(['/acc/' + this.id]);
      })
    }
}


