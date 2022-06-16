import { StudentService } from './../service/student.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Grupa } from '../model/grupa.model';
import { Projekat } from '../model/projekat.model';
import { Student } from '../model/student.model';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../dialog/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  displayedColumns = ['id', 'ime', 'prezime', 'broj_indeksa', 'grupa', 'projekat', 'actions'];

  grupa!: Grupa;

  projekat!: Projekat;

  //dataSource!: Observable<Student[]>;
  dataSource!: MatTableDataSource<Student>;

  selektovaniStudent!: Student;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public studentService: StudentService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    //this.dataSource = this.studentService.getAllStudent(this.selektovanaGrupa.id);
    this.studentService.getAllStudent().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      //pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const acumulator = (currentTerm: string, key: string) => {
          return key === 'grupa' ? currentTerm + data.grupa.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(acumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch(property) {
          case 'id': return data[property];
          case 'ime': return data[property];
          case 'prezime': return data[property];
          case 'broj_indeksa': return data[property];
          case 'grupa': return data.grupa.naziv;
          case 'projekat': return data.projekat.naziv;
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, ime: string, prezime: string, broj_indeksa: string, grupa: Grupa, projekat: Projekat) {
    const dialog = this.dialog.open(StudentDialogComponent, {data: {id: id, ime: ime, prezime: prezime, broj_indeksa: broj_indeksa, grupa: Grupa, projekat: Projekat}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  public selectedRow(row: Student): void {
    this.selektovaniStudent = row;
  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}