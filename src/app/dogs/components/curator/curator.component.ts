import {Component, OnInit} from '@angular/core';
import {CuratorService} from '../../service/curator.service';
import {MatTableDataSource} from '@angular/material';
import {Curator} from '../../domain/curator';

@Component({
  selector: 'app-curator',
  templateUrl: './curator.component.html',
  styleUrls: ['./curator.component.css']
})
export class CuratorComponent implements OnInit {

  elementsPerPage: number = 5;
  tableColumns = ['ID', 'Name', 'PhoneNumber', 'DogsCount', 'DogsLimit'];

  curators: MatTableDataSource<Curator> = new MatTableDataSource<Curator>();

  constructor(private curatorService: CuratorService) {
  }

  ngOnInit() {
    this.curatorService.getAll(0, this.elementsPerPage)
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.curators.data = res;
        }
      });
  }

  add(): void {
    this.curatorService.
  }

}
