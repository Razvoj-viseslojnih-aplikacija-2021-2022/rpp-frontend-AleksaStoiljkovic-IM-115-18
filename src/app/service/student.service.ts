import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from "@angular/core";
import { Student } from '../model/student.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class StudentService {
    private readonly API_URL = 'http://localhost:8082/student/';

    dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

    constructor(private httpClient: HttpClient) {}

    public getAllStudent(): Observable<Student[]> {
        this.httpClient.get<Student[]>(this.API_URL).subscribe(
            (data) => {
                this.dataChange.next(data);
            },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            }
        );
        return this. dataChange.asObservable();
    }

    public addStudent(student: Student): void {
        this.httpClient.post(this.API_URL, student).subscribe();
    }

    public updateStudent(student: Student): void {
        this.httpClient.put(this.API_URL + student.id, student).subscribe();
    }

    public deleteStudent(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}