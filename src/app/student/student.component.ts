import { StudentService } from './../service/student.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Grupa } from '../model/grupa.model';
import { Projekat } from '../model/projekat.model';
import { Student } from '../model/student.model';
import { MatDialog } from '@angular/material/dialog';

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

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sor!: Sort;

  @Input()
  selektovanaGrupa!: Grupa;

  constructor(public StudentService: StudentService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(): void {
    if (this.selektovanaGrupa.id) {
      this.loadData();
    }
  }

  public loadData() {
    //this.dataSource = this.studentService.getAllStudent(this.selektovanaGrupa.id);
    this.studentService.getAllStudent().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      //pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const acc
      }
    })
  }

}
