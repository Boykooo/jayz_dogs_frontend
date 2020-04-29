import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Dog } from '../../../domain/dog';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-dog-dialog',
  templateUrl: './dog-dialog.component.html',
  styleUrls: ['dog-dialog.component.css']
})
export class DogDialogComponent {

  curatorId: number;
  id: number;
  validation: FormGroup;

  constructor(private dogDialog: MatDialogRef<DogDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dogData: Dog) {
    //ПРАВИЛА ВАЛИДАЦИИ
    this.validation = new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'sex': new FormControl('', [Validators.required]),
        'age': new FormControl('', [Validators.required, Validators.min(1)]),
        'breed': new FormControl('', [Validators.required]),
      }
    )
  }

  ngOnInit(): void {
    this.initValidation(this.dogData);
  }

  submit() {
    if (this.validation.valid) {
      this.dogDialog.close(this.buildDog());
    }
  }

  private buildDog(): Dog {
    let dog = new Dog();
    dog.id = this.id;
    dog.curatorId = this.curatorId;
    dog.age = this.validation.get('age').value;
    dog.breed = this.validation.get('breed').value;
    dog.sex = this.validation.get('sex').value;
    dog.name = this.validation.get('name').value;
    return dog;
  }

  private initValidation(dog: Dog) {
    if (dog) {
      this.validation.setValue({
        'name': dog.name,
        'sex': dog.sex,
        'age': dog.age,
        'breed': dog.breed
      })
    }
  }

}
