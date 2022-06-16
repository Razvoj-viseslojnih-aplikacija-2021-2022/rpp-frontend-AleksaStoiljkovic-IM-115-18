import { StudentService } from './service/student.service';
import { SmerService } from './service/smer.service';
import { ProjekatService } from './service/projekat.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AboutComponent } from './core/about/about.component';
import { ProjekatDialogComponent } from './dialog/projekat-dialog/projekat-dialog.component';
import { SmerDialogComponent } from './dialog/smer-dialog/smer-dialog.component';
import { GrupaDialogComponent } from './dialog/grupa-dialog/grupa-dialog.component';
import { StudentDialogComponent } from './dialog/student-dialog/student-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { SmerComponent } from './smer/smer.component';
import { ProjekatComponent } from './projekat/projekat.component';
import { GrupaComponent } from './grupa/grupa.component';
import { StudentComponent } from './student/student.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './core/home/home.component';
import { AuthorComponent } from './core/author/author.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GrupaService } from './service/grupa.service';

const Routes = [{path: 'smer', component: SmerComponent},
                {path: 'grupa', component: GrupaComponent},
                {path: 'projekat', component: ProjekatComponent},
                {path: 'student', component: StudentComponent},
                {path: 'home', component: HomeComponent},
                {path: 'author', component: AuthorComponent},
                {path: 'about', component: AboutComponent},
                {path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjekatDialogComponent,
    SmerDialogComponent,
    GrupaDialogComponent,
    StudentDialogComponent,
    SmerComponent,
    ProjekatComponent,
    GrupaComponent,
    StudentComponent
  ],
  imports: [
  BrowserModule,
    MatSidenavModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, GrupaService, ProjekatService, SmerService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
