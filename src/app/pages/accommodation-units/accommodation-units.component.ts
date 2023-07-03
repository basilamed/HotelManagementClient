import { Component } from '@angular/core';
import { AccommodationUnitsService, UnitQueryDto } from 'src/app/services/accommodation-units.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-accommodation-units',
  templateUrl: './accommodation-units.component.html',
  styleUrls: ['./accommodation-units.component.css']
})
export class AccommodationUnitsComponent {
  units: any[] = [];
  user: any = [];
  filters!: UnitQueryDto;
  currentPage: number = 1;
  pageSize: number = 2; 
  totalItems!: number;
  
  constructor(private service: AccommodationUnitsService, 
    private router: Router,
    public userService: UserService) { 
      this.filters = {
        price: 0,
        sortBy: '',
        isSortAscending: true,
        floor: undefined,
        numberOfPeople: undefined,
        periodOf: undefined,
        periodTo: undefined,
        page: 1,
        pageSize: 2
      };
    }

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
    this.filters.pageSize = 2;
    this.loadAccommodationUnits();
  } 

  loadAccommodationUnits() {
    this.filters.page = this.currentPage; // Oduzmite 1 jer API počinje indeksiranje od 0
    this.filters.pageSize = this.pageSize;

    this.service.getFilteredAccommodationUnits(this.filters).subscribe((res: any) => {
      this.units = res.items;
      this.totalItems = res.totalItems;
      console.log(this.units);
    }, err => {
      console.log(err);
    });
  }

  onOrderByChange() {
    this.filters.sortBy = 'Price';
    this.loadAccommodationUnits();
  }

  openInfo(id: number) {
    this.router.navigate([`/acc/${id}`]);
  }

  apply() {
    if (this.filters.periodOf) {
      const periodOfDate = new Date(this.filters.periodOf);
      this.filters.periodOf = `${periodOfDate.getMonth() + 1}-${periodOfDate.getDate()}-${periodOfDate.getFullYear()}`;
    }
  
    if (this.filters.periodTo) {
      const periodToDate = new Date(this.filters.periodTo);
      this.filters.periodTo = `${periodToDate.getMonth() + 1}-${periodToDate.getDate()}-${periodToDate.getFullYear()}`;
    }
  
    this.loadAccommodationUnits();
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    this.filters.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadAccommodationUnits();
  }
}
