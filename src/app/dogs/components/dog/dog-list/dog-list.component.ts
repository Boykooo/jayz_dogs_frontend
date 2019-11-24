import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Dog } from '../../../domain/dog';
import { DogService } from '../../../service/dog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DogDialogComponent } from '../dog-dialog/dog-dialog.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Sex } from '../../../domain/sex';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css']
})
export class DogListComponent implements OnInit {

  Sex: Sex;
  curatorId: number;
  elementsPerPage: number = 5;
  totalDogs: number;
  tableColumns = ['id', 'name', 'sex', 'age', 'breed', 'DeleteButton'];
  dogs: MatTableDataSource<Dog> = new MatTableDataSource<Dog>();

  @ViewChild(MatPaginator)
  dogPaginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private dogService: DogService,
              private dialogService: MatDialog,
              private router: Router,
              private actRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.curatorId = this.actRoute.snapshot.params['id'];
    this.initPage(0);
  }

  ngAfterViewInit(): void {
    this.dogs.sort = this.sort;
    this.sort.sortChange.subscribe(() => this.initPage(this.dogPaginator.pageIndex));
    this.dogPaginator.page
      .subscribe((pageEvent: PageEvent) => this.initPage(pageEvent.pageIndex));
  }

  initPage(page: number) {
    this.dogService.getAll(this.curatorId, page, this.elementsPerPage, this.sort.active, this.sort.direction)
      .subscribe(res => {
        if (res) {
          this.dogs.data = res.data;
          this.totalDogs = res.count;
        }
      });
  }

  add(): void {
    this.dialogService.open(DogDialogComponent, {
      width: '300px'
    })
      .afterClosed()
      .subscribe(res => {
        res.curatorId = this.curatorId;
        this.dogService.create(res)
          .subscribe(res => {
              console.log(res);
              if (this.dogs.data.length < this.elementsPerPage) {
                this.dogs.data.push(res);
                this.dogs._updateChangeSubscription();
              }
              this.totalDogs++;
            },
            error => {
              alert('Ошибка. Данному куратору нельзя добавить больше собак');
            }
          );
      });
  }

  edit(dog: Dog): void {
    this.dialogService.open(DogDialogComponent, {
      width: '300px',
      'data': dog
    })
      .afterClosed()
      .subscribe(res => {
        res.curatorId = this.curatorId;
        this.dogService.update(res)
          .subscribe();
      });
  }

  delete(dog: Dog): void {
    event.stopPropagation();
    this.dialogService.open(ConfirmDialogComponent, {width: '300px'})
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.dogService.delete(dog.id).subscribe(() => {
            let index = this.dogs.data.indexOf(dog);
            if (index >= 0) {
              this.dogs.data.splice(index, 1);
              this.dogs._updateChangeSubscription();
            }
          });
        }
      });
  }

  toDog(dog: Dog) {
    event.stopPropagation();
    this.router.navigateByUrl(`curator/${this.curatorId}/dogs/${dog.id}`);
  }

}
