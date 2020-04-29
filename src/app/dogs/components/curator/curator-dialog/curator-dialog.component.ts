import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { Curator } from '../../../domain/curator';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-curator-dialog',
  templateUrl: './curator-dialog.component.html',
  styleUrls: ['curator-dialog.component.css']
})
export class CuratorDialogComponent implements OnInit {

  id: number;
  validation: FormGroup;

  constructor(private curatorDialog: MatDialogRef<CuratorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public curatorData: Curator) {
    //ПРАВИЛА ВАЛИДАЦИИ
    this.validation = new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'lastname': new FormControl('', [Validators.required]),
        'phoneNumber': new FormControl('', [Validators.required]),
        'dogsLimit': new FormControl('', [Validators.required, Validators.min(0)]),
      }
    )
  }

  ngOnInit(): void {
    if (this.curatorData) {
      this.id = this.curatorData.id;
      this.initValidation(this.curatorData);
    }
  }

  submit() {
    if (this.validation.valid) {
      this.curatorDialog.close(this.buildCurator());
    }
  }

  private buildCurator(): Curator {
    let curator = new Curator();
    curator.id = this.id;
    curator.name = this.validation.get('name').value;
    curator.dogsLimit = this.validation.get('dogsLimit').value;
    curator.lastname = this.validation.get('lastname').value;
    curator.phoneNumber = this.validation.get('phoneNumber').value;
    return curator;
  }

  private initValidation(curator: Curator) {
    this.validation.setValue({
      'name': curator.name,
      'lastname': curator.lastname,
      'phoneNumber': curator.lastname,
      'dogsLimit': curator.dogsLimit
    })
  }

}
