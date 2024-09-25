import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';
import { envirenement } from '../app/envirenement/envirenement';
import { Trimestre } from '../models/trimestre';


@Injectable({
    providedIn: 'root',
})

export class TrimestreService {

    private apiServerUrl = envirenement.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public addTrimestre(trimestre: Trimestre): Observable<Trimestre> {
        return this.http.post<Trimestre>(`${this.apiServerUrl}/Trimestre/add`, trimestre);
    }

    public findTrimestreById(id: number | undefined): Observable<Trimestre> {
        return this.http.get<Trimestre>(`${this.apiServerUrl}/Trimestre/find/${id}`);
    }

    public deleteTrimestrebyId(id: number | null): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/Trimestre/delete/` + id);
    }

    public CurrentTrimestre(): Observable<Trimestre> {
        return this.http.get<Trimestre>(`${this.apiServerUrl}/Trimestre/Current`);
    }

    public Alltrimestres(): Observable<Trimestre[]> {
        return this.http.get<Trimestre[]>(`${this.apiServerUrl}/Trimestre/all`);
    }

    public AllCapacities(id: number | undefined): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiServerUrl}/CollaborateurTrimestre/Trimestre/` + id);
    }


}