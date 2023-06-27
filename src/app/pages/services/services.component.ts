import { Component } from '@angular/core';
import { ServicesService, AddService } from 'src/app/services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {

  id: number = 0;
  services: any [] = [];

  constructor(private ServicesService: ServicesService,
    private router: Router) { }

  ngOnInit(): void {
    this.ServicesService.getServices().subscribe((res: any) => {
      this.services = res;
      console.log(this.services)
    },
    err => {
      console.log(err)
    })
  }

} 
