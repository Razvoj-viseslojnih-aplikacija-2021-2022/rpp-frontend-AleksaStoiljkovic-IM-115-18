import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Grupa } from 'src/app/model/grupa.model';
import { Smer } from 'src/app/model/smer.model';
import { GrupaService } from 'src/app/service/grupa.service';
import { SmerService } from 'src/app/service/smer.service';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent implements OnInit {

  public flag!: number;

  smerovi!: Smer[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GrupaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Grupa,
    public grupaService: GrupaService,
    public smerService: SmerService) { }

    

  ngOnInit(): void {
    this.smerService.getAllSmer().subscribe(smerovi =>
    this.smerovi = smerovi)
  }

  public add(): void {
    this.grupaService.addGrupa(this.data);
    this.snackBar.open('Uspesno dodata grupa ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.grupaService.updateGrupa(this.data);
    this.snackBar.open('Uspesno izmenjena grupa ' + this.data.id, 'Uredu', {duration: 2000})
  }

  public delete(): void {
    this.grupaService.deleteGrupa(this.data.id);
    this.snackBar.open('Uspesno obrisana grupa ' + this.data.id, 'Uredu', {duration: 2000})
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000})
  }

  compareTo(a: any, b:any) {
    return a.id === b.id;
  }

}
