import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  private dialogRefs: MatDialogRef<LoadingSpinnerComponent>[] = [];
  constructor(private dialog: MatDialog) { }

  open(): MatDialogRef<LoadingSpinnerComponent> {
    const dialogRef = this.dialog.open(LoadingSpinnerComponent);
    this.dialogRefs.push(dialogRef);
    return dialogRef;
  }

  close(dialogRef: MatDialogRef<LoadingSpinnerComponent>): void {
    dialogRef.close();
    this.dialogRefs = this.dialogRefs.filter(ref => ref !== dialogRef);
  }

  closeAll(): void {
    this.dialogRefs.forEach(ref => ref.close());
    this.dialogRefs = [];
  }
}
