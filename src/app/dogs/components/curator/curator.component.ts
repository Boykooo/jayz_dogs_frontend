import {Component, OnInit, ViewChild} from '@angular/core';
import {CuratorService} from '../../service/curator.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {Curator} from '../../domain/curator';
import {CuratorDialogComponent} from './curator-dialog/curator-dialog.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-curator',
  templateUrl: './curator.component.html',
  styleUrls: ['./curator.component.css']
})
export class CuratorComponent implements OnInit {

  elementsPerPage: number = 5;
  totalCurators: number;
  tableColumns = ['id', 'name', 'phoneNumber', 'dogsCount', 'dogsLimit', 'DeleteButton'];
  curators: MatTableDataSource<Curator> = new MatTableDataSource<Curator>();

  @ViewChild(MatPaginator)
  curatorsPaginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private curatorService: CuratorService,
              private dialogService: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.initPage(0);
  }

  ngAfterViewInit(): void {
    this.curators.sort = this.sort;
    this.sort.sortChange.subscribe(event => {
      this.initPage(this.curatorsPaginator.pageIndex);
    });
    this.curatorsPaginator.page
      .subscribe(
        (pageEvent: PageEvent) => this.initPage(pageEvent.pageIndex));
  }

  initPage(page: number) {
    this.curatorService.getAll(page, this.elementsPerPage, this.sort.active, this.sort.direction)
      .subscribe(res => {
        if (res) {
          this.curators.data = res.data;
          this.totalCurators = res.count;
        }
      });
  }

  add(): void {
    this.dialogService.open(CuratorDialogComponent, {
      width: '300px'
    })
      .afterClosed()
      .subscribe(res => {
        this.curatorService.create(res)
          .subscribe(res => {
            if (this.curators.data.length < this.elementsPerPage) {
              this.curators.data.push(res);
              this.curators._updateChangeSubscription();
            }
            this.totalCurators++;
          });
      });
  }

  edit(curator: Curator): void {
    this.dialogService.open(CuratorDialogComponent, {
      width: '300px',
      'data': curator
    })
      .afterClosed()
      .subscribe(res => {
        this.curatorService.update(res)
          .subscribe();
      });
  }

  delete(curator: Curator): void {
    this.dialogService.open(ConfirmDialogComponent, {width: '300px'})
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.curatorService.delete(curator.id);
          let index = this.curators.data.indexOf(curator);
          console.log(index);
          if (index >= 0) {
            this.curators.data.splice(index, 1);
            this.curators._updateChangeSubscription();
          }
        }
      });
  }

  showDogs(curator: Curator): void {
    this.router.navigateByUrl('curator/' + curator.id + '/dogs');
  }

}
