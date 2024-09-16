import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';
import { envirenement } from '../app/envirenement/envirenement';
import { Collaborateur } from '../models/collaborateur';


@Injectable({
    providedIn: 'root',
})

export class ProjteService {
    private apiServerUrl = envirenement.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getProjet(): Observable<Projet[]> {
        return this.http.get<Projet[]>(`${this.apiServerUrl}/Projet/all`,);
    }

    public getProjetByTrimestreId(id: number): Observable<Projet[]> {
        return this.http.get<Projet[]>(`${this.apiServerUrl}/Projet/all`,);
    }

    public getProjetbyId(id: number): Observable<Projet> {
        return this.http.get<Projet>(`${this.apiServerUrl}/Projet/find/` + id);
    }

    public deleteProjetbyId(id: number | null): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/Projet/delete/` + id);
    }

    public addProjet(projet: Projet): Observable<Projet> {
        return this.http.post<Projet>(`${this.apiServerUrl}/Projet/add`, projet);
    }

    public editProjet(projet: Projet): Observable<Projet> {
        return this.http.put<Projet>(`${this.apiServerUrl}/Projet/update`, projet);
    }

    public ajouterRemarque(projet: Projet): Observable<Projet> {
        return this.http.put<Projet>(`${this.apiServerUrl}/Projet/remarque`, projet);
    }

    public getCollaborateurs(id: number): Observable<Collaborateur[]> {
        return this.http.get<Collaborateur[]>(`${this.apiServerUrl}/ProjetCollaborateur/projet/` + id + `/Collaborateurs`,);
    }

    public assignCollaborateur(idCollaborateur: number, idProjet: number | null): Observable<any> {
        return this.http.get<any>(`${this.apiServerUrl}/ProjetCollaborateur/assign/${idProjet}/${idCollaborateur}`);
    }





}