import {MatDialogRef} from '@angular/material';
import {Component} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog-component',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(private dialog: MatDialogRef<ConfirmDialogComponent>) {
  }

  public confirm(): void {
    this.dialog.close(
      true
    );
  }

  public cancel(): void {
    this.dialog.close(
      false
    );
  }

}
