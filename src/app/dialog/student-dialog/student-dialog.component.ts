import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from './../../service/student.service';
import { GrupaService } from './../../service/grupa.service';
import { ProjekatService } from './../../service/projekat.service';
import { Grupa } from 'src/app/model/grupa.model';
import { Student } from 'src/app/model/student.model';
import { Projekat } from 'src/app/model/projekat.model';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  public flag!: number;

  grupe!: Grupa[];

  projekti!: Projekat[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Student,
    public studentService: StudentService,
    public grupaService: GrupaService,
    public projekatService: ProjekatService) { }

  ngOnInit(): void {
    this.grupaService.getAllGrupa().subscribe(grupe =>
    this.grupe = grupe)
    this.projekatService.getAllProjekat().subscribe(projekti =>
    this.projekti = projekti)
  }

  public add(): void {
    this.studentService.addStudent(this.data);
    this.snackBar.open('Uspesno dodat student ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.studentService.updateStudent(this.data);
    this.snackBar.open('Uspesno izmenjen student ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.studentService.deleteStudent(this.data.id);
    this.snackBar.open('Uspesno obrisan student ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: any, b:any) {
    return a.id === b.id;
  }

}
