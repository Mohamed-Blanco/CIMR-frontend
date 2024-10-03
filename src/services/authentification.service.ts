import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirenement } from '../app/envirenement/envirenement';
import { Collaborateur } from '../models/collaborateur';
import { Competence } from '../models/competence';


@Injectable({
    providedIn: 'root',
})

export class authentificationservice {


    private apiServerUrl = envirenement.apiBaseUrl;


    constructor(private http: HttpClient) { }

    register(collaborateur: Collaborateur): Observable<Collaborateur> {
        return this.http.post<Collaborateur>(`${this.apiServerUrl}/auth/signup`, collaborateur);
    }

    Allcompetences(): Observable<Competence[]> {
        return this.http.get<Competence[]>(`${this.apiServerUrl}/Competence/all`);
    }

    logout() {
        return localStorage.setItem('token', '');
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.apiServerUrl}/auth/login`, credentials);
    }


    // Function to check if the user is authenticated
    isAuthenticated(): boolean {
        const token = this.getToken(); // Assuming you store JWT in localStorage or sessionStorage
        return !!token && !this.isTokenExpired(token); // Double-check if token exists and is not expired
    }

    // Retrieve token from localStorage (or sessionStorage)
    getToken(): string | null {
        return localStorage.getItem('token'); // Or sessionStorage
    }

    getCollaborateurID(): string | null {
        return localStorage.getItem('token'); // Or sessionStorage
    }

    public me(): Observable<Collaborateur> {
        return this.http.get<Collaborateur>(`${this.apiServerUrl}/Collaborateurs/me`);
    }

    // Check if the token has expired (optional, depends on your use case)
    isTokenExpired(token: string): boolean {
        const expiry = this.getTokenExpiration(token);
        if (!expiry) {
            localStorage.setItem('token', '');
            return true;
        }
        return expiry < Date.now() / 1000;
    }

    // Extract expiration date from the token (JWT) using base64 decoding
    getTokenExpiration(token: string): number | null {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp;
        } catch (e) {
            return null;
        }
    }

}