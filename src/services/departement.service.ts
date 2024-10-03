import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirenement } from '../app/envirenement/envirenement';
import { departement } from '../models/departement';

@Injectable({
    providedIn: 'root',
})

export class DepartementService {
    private apiServerUrl = envirenement.apiBaseUrl;

    constructor(private http: HttpClient) {

    }

    public getdepartements(): Observable<departement[]> {
        return this.http.get<departement[]>(
            `${this.apiServerUrl}/Departement/all`,
        );
    }

    public getdepartementsByID(id: number | undefined): Observable<departement[]> {
        return this.http.get<departement[]>(
            `${this.apiServerUrl}/Departement/all/${id}`,
        );
    }

    adddepartement(dep: departement): Observable<departement> {
        return this.http.post<departement>(`${this.apiServerUrl}/Departement/add`, dep);
    }


}