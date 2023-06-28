import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent{

  currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
  }

}
