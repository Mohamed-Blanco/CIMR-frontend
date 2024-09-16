import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborateur } from '../models/collaborateur';
import { envirenement } from '../app/envirenement/envirenement';
import { Projet } from '../models/projet';

@Injectable({
    providedIn: 'root',
})
export class collaborateurservice {
    private apiServerUrl = envirenement.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getCollaborateurs(): Observable<Collaborateur[]> {
        return this.http.get<Collaborateur[]>(
            `${this.apiServerUrl}/Collaborateurs/all/count`,
        );
    }


    public addCollaborateur(
        collaborateur: Collaborateur,
    ): Observable<Collaborateur> {
        return this.http.post<Collaborateur>(
            `${this.apiServerUrl}/Collaborateurs/add`,
            collaborateur,
        );
    }

    public deletecollaborateur(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/Collaborateurs/delete/${id}`);
    }

    public getProjetsforcollaborateur(id: number): Observable<Projet[]> {
        return this.http.get<Projet[]>(`${this.apiServerUrl}/Collaborateur/${id}/Projet`,);
    }

    public getNumberProjetsforcollaborateur(id: number): Observable<number> {
        return this.http.get<number>(`${this.apiServerUrl}/ProjetCollaborateur/Collaborateur/${id}/Count/Projet`,);
    }

    public getCollaborateursNotInProjet(id: number | null): Observable<Collaborateur[]> {
        return this.http.get<Collaborateur[]>(`${this.apiServerUrl}/ProjetCollaborateur/notin/${id}`);
    }
}
