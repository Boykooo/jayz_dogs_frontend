import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Dog} from '../../../domain/dog';

@Component({
  selector: 'app-dog-dialog',
  templateUrl: './dog-dialog.component.html',
  styleUrls: ['dog-dialog.component.css']
})
export class DogDialogComponent {

  dog: Dog;

  constructor(private curatorDialog: MatDialogRef<DogDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dogData: Dog) {
  }

  ngOnInit(): void {
    this.dog = new Dog();
    if (this.dogData) {
      this.dog = this.dogData;
    }
  }

  submit() {
    this.curatorDialog.close(this.dog);
  }

}
