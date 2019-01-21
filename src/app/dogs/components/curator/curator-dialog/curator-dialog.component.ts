import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {Curator} from '../../../domain/curator';

@Component({
  selector: 'app-curator-dialog',
  templateUrl: './curator-dialog.component.html',
  styleUrls: ['curator-dialog.component.css']
})
export class CuratorDialogComponent implements OnInit {

  curator: Curator;

  constructor(private curatorDialog: MatDialogRef<CuratorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public curatorData: Curator) {
  }

  ngOnInit(): void {
    console.log(this.curatorData);
    this.curator = new Curator();
    if (this.curatorData) {
      this.curator = this.curatorData;
    }
  }

  submit() {
    this.curatorDialog.close(this.curator);
  }

}
