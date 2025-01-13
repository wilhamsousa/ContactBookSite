import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  constructor(private dialogRef: MatDialogRef<LoadingSpinnerComponent>){}

  close(): void { 
    this.dialogRef.close(); 
  }
}
