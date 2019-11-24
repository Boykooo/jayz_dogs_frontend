import { Component, OnInit } from '@angular/core';
import { DogService } from '../../../service/dog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dog } from '../../../domain/dog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent implements OnInit {

  dog: Dog = new Dog();
  curatorId: number;

  constructor(private dogService: DogService,
              private actRoute: ActivatedRoute,
              private router: Router,
              private dialogService: MatDialog) {
    this.curatorId = this.actRoute.snapshot.params['id'];
    let dogId = this.actRoute.snapshot.params['dogId'];
    this.dogService.getById(dogId).subscribe(dog => {
      this.dog = dog;
      this.dog.curatorId = this.curatorId;
    });
  }

  ngOnInit() {

  }

  back() {
    history.back();
  }

  save() {
    this.dogService.update(this.dog).subscribe(
      () => this.router.navigateByUrl(`curator/${this.curatorId}/dogs`)
    );
  }

  delete(): void {
    this.dialogService.open(ConfirmDialogComponent, {width: '300px'})
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.dogService.delete(this.dog.id).subscribe(() => this.router.navigateByUrl(`curator/${this.curatorId}/dogs`));
        }
      });
  }

}
