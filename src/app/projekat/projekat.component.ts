import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Projekat } from '../model/projekat.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjekatService } from '../service/projekat.service';
import { ProjekatDialogComponent } from '../dialog/projekat-dialog/projekat-dialog.component';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];

  dataSource!: MatTableDataSource<Projekat>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public projekatService: ProjekatService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.projekatService.getAllProjekat().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data: any, property) => {
      switch(property) {
        case 'id': return data[property];
        default: return data[property].toLocaleLowerCase();
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
  
}

public openDialog(flag: number, id: number, naziv: string, oznaka: string, opis: string) {
  const dialog = this.dialog.open(ProjekatDialogComponent, {data: {id: id, naziv: naziv, oznaka: oznaka, opis: opis}});
  dialog.componentInstance.flag = flag;
  dialog.afterClosed().subscribe(result => {
    if (result === 1) {
      this.loadData();
    }
  })
}

applyFilter(filterValue: string) {
  filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}


}
