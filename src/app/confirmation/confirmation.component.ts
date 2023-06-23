import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    // Implementirajte akciju koja se izvršava prilikom potvrde
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Implementirajte akciju koja se izvršava prilikom odustajanja
    this.dialogRef.close(false);
  }

}
