import { Smer } from './../model/smer.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrupaService } from './../service/grupa.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrupaDialogComponent } from '../dialog/grupa-dialog/grupa-dialog.component';
import { Grupa } from '../model/grupa.model';
import { SmerService } from '../service/smer.service';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrls: ['./grupa.component.css']
})
export class GrupaComponent implements OnInit {

  displayedColumns = ['id', 'oznaka', 'smer', 'actions'];

  smer!: Smer;

  dataSource!: MatTableDataSource<Grupa>;

  selektovanaGrupa!: Grupa;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public grupaService: GrupaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.grupaService.getAllGrupa().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const acumulator = (currentTerm: string, key: string) => {
          return key === 'smer' ? currentTerm + data.smer.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(acumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch(property) {
          case 'id': return data[property];
          case 'oznaka': return data[property];
          case 'smer': return data.smer.naziv;
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, oznaka: string, smer: Smer) {
    const dialog = this.dialog.open(GrupaDialogComponent, {data: {id: id, oznaka: oznaka, smer: smer}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  public selectedRow(row: Grupa): void {
    this.selektovanaGrupa = row;

  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}