import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationUnitsService, SaveAccommodationUnit } from 'src/app/services/accommodation-units.service';
import { CharacteristicService } from 'src/app/services/characteristic.service';
import { MinibarService } from 'src/app/services/minibar.service';

interface minibar {
  id: number;
  name: string;
}
interface characteristic {
  id: number;
  name: string;
}
@Component({
  selector: 'app-add-accomodation',
  templateUrl: './add-accomodation.component.html',
  styleUrls: ['./add-accomodation.component.css']
})


export class AddAccomodationComponent { 
  id: number = 0;
  minibars: minibar [] = [];
  characteristics: any[] = [];
  constructor(private router: Router, private AccommodationUnitsService: AccommodationUnitsService, 
    private route: ActivatedRoute, public MinibarSevice : MinibarService, public CharacteristicService : CharacteristicService) { }
  
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +(params.get('id') ?? 0);
    })
    this.MinibarSevice.getMinibars().subscribe((res: any) => {
      this.minibars = res;
      console.log(this.minibars)
    },
    err => {
      console.log(err)
    })
    this.CharacteristicService.getCharacteristics().subscribe((res: any) => {
      this.characteristics = res;
      console.log(this.characteristics)
    },
    err => {
      console.log(err)
    })
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    floor: new FormControl('', [Validators.required, Validators.min(2), Validators.max(6)]),
    capacity: new FormControl('', [Validators.required, Validators.min(1), Validators.max(7)]),
    characteristicsId: new FormControl('', [Validators.required]),
    minibarId: new FormControl('', [Validators.required])
  })

 
  
  get Name(){
    return this.form.get('name');
  }
  
  get Type(){
    return this.form.get('type');
  }

  get Image(){
    return this.form.get('image');
  }

  get Floor(){
    return this.form.get('floor');
  }

  get Capacity(){
    return this.form.get('capacity');
  }

  get CharacteristicsId(){
    return this.form.get('characteristicsId');
  }

  get MinibarId(){
    return this.form.get('minibarId');
  }


  async addAccommodationUnit() {
    const imageInput = document.getElementById('imageInput') as HTMLInputElement;
    const image2 = imageInput.files?.item(0);
    
    if (image2) {
      const reader = new FileReader();
      
      const base64Image = await new Promise<string>((resolve) => {
        reader.addEventListener('load', () => {
          resolve(reader.result as string);
        });
        
        reader.readAsDataURL(image2);
      });
      
      console.log(base64Image);
  
      var AccommodationUnit: SaveAccommodationUnit = {
        name: this.Name?.value ?? '',
        floor: +(this.Floor?.value ?? 0),
        capacity: +(this.Capacity?.value ?? 0),
        type: this.Type?.value ?? '',
        characteristicsId: +(this.CharacteristicsId?.value ?? 0),
        minibarId: +(this.MinibarId?.value ?? 0),
        image: base64Image ?? ''

        

      }
      console.log(AccommodationUnit);
      
      console.log(AccommodationUnit.characteristicsId);
  
      
    }
  }
  

}