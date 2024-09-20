import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborateur } from '../models/collaborateur';
import { envirenement } from '../app/envirenement/envirenement';
import { Action } from '../models/action';

@Injectable({
    providedIn: 'root',
})

export class actionservice {

    private apiServerUrl = envirenement.apiBaseUrl;


    constructor(private http: HttpClient) { }

    public getProjetActions(id: number | null): Observable<Action[]> {
        return this.http.get<Action[]>(
            `${this.apiServerUrl}/Action/find/Projet/${id}`
        );
    }

    public deleteAction(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/Action/delete/${id}`);
    }


    public SetCompletedAction(action: Action) {
        return this.http.put<Action>(
            `${this.apiServerUrl}/Action/Completed`, action
        );
    }

    public SetUnCompletedAction(action: Action) {
        return this.http.put<Action>(
            `${this.apiServerUrl}/Action/Uncompleted`, action
        );
    }

    public SetAnnulerAction(action: Action) {
        return this.http.put<Action>(
            `${this.apiServerUrl}/Action/Annuler`, action
        );
    }

    public addAction(action: Action): Observable<Action> {

        return this.http.post<Action>(
            `${this.apiServerUrl}/Action/add`, action,
        );
    }

    public updateAction(action: Action): Observable<Action> {

        return this.http.put<Action>(
            `${this.apiServerUrl}/Action/update`, action,
        );
    }
}