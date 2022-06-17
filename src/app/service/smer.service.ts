import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from "@angular/core";
import { Smer } from '../model/smer.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class SmerService {
    
    private readonly API_URL = 'http://localhost:8082/smer/';

    dataChange: BehaviorSubject<Smer[]> = new BehaviorSubject<Smer[]>([]);

    constructor(private httpClient: HttpClient) {}

    public getAllSmer(): Observable<Smer[]> {
        this.httpClient.get<Smer[]>(this.API_URL).subscribe(
            (data) => {
                this.dataChange.next(data);
            },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            }
        );
        return this.dataChange.asObservable();
    }

    public addSmer(smer: Smer): void {
        this.httpClient.post(this.API_URL, smer).subscribe();
    }

    public updateSmer(smer: Smer): void {
        this.httpClient.put(this.API_URL + smer.id, smer).subscribe();
    }

    public deleteSmer(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}