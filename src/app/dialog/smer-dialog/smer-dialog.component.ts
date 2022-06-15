import { SmerService } from './../../service/smer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Smer } from 'src/app/model/smer.model';

@Component({
  selector: 'app-smer-dialog',
  templateUrl: './smer-dialog.component.html',
  styleUrls: ['./smer-dialog.component.css']
})
export class SmerDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SmerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Smer,
    public smerService: SmerService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.smerService.addSmer(this.data);
    this.snackBar.open('Uspesno dodat smer ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.smerService.updateSmer(this.data);
    this.snackBar.open('Uspesno izmenjen smer' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.smerService.deleteSmer(this.data.id);
    this.snackBar.open('Uspesno obrisan smer ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

}
