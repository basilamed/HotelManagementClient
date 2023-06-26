import { Component } from '@angular/core';
import { MinibarService, SaveMinibarItem } from 'src/app/services/minibar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minibars',
  templateUrl: './minibars.component.html',
  styleUrls: ['./minibars.component.css']
})
export class MinibarsComponent {
  minibars: any [] = [];
  id: number = 0;

  constructor(private MinibarService: MinibarService, 
    private router: Router) { }
  ngOnInit(): void {
    this.MinibarService.getMinibars().subscribe((res: any) => {
      this.minibars = res;
      console.log(this.minibars)
    },
    err => {
      console.log(err)
    })
  } 
 
  
  openInfo(id: Number){
    this.router.navigate([`/minibar/${id}`]);
  }
}
