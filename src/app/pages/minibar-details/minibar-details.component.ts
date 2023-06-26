import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MinibarService } from 'src/app/services/minibar.service';

@Component({
  selector: 'app-minibar-details',
  templateUrl: './minibar-details.component.html',
  styleUrls: ['./minibar-details.component.css']
})
export class MinibarDetailsComponent {

  minibarDetails: any = {}
  id: number = 0;
  minibar: any = [];

  constructor(private router: ActivatedRoute,
      public MinibarService : MinibarService, 
      public Router : Router,
      public dialog : MatDialog) { }

      ngOnInit(): void {
        this.router.paramMap.subscribe(params => {
          this.id = Number(params.get('id') ?? 0);
          this.MinibarService.getMinibarById(this.id).subscribe(data => {
            this.minibarDetails = data;
            console.log(this.minibarDetails);
          },
            err => {
              console.log(err)
              })
          
        })   
      }
      openConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationComponent);
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.delete();
            this.Router.navigate([`/`]);
          }
        });
      }

      delete(){
        this.MinibarService.deleteMinibar(this.id).subscribe(res => {
          console.log(res);
        },
        err => {
          console.log(err);
        })
      }

      deleteItem( minibarId : Number, id: Number){
        this.MinibarService.deleteItem(minibarId, id).subscribe((res: any) => {
          this.ngOnInit();
        },
        err => {
          console.log(err)
        })
      }
      addItem(){
        this.Router.navigate(['addToMinibar/' + this.id]);
      }

      

}
