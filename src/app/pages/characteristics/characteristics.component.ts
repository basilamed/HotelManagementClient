import { Component } from '@angular/core';
import { CharacteristicService, Characteristic } from 'src/app/services/characteristic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent {

  characteristics: any [] = [];

  constructor(private characteristicService: CharacteristicService,
    private router: Router) { }

  ngOnInit(): void {
    this.characteristicService.getCharacteristics().subscribe((res: any) => {
      this.characteristics = res;
      console.log(this.characteristics)
    },
    err => {
      console.log(err)
    })
  }

}
