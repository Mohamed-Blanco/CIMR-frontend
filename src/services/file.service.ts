import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    private baseUrl = 'http://localhost:8090';

    constructor(private http: HttpClient) { }

    upload(file: FormData, email: String): Observable<any> {

        return this.http.post(`${this.baseUrl}/Collaborateurs/fileUpload/${email}`, file);
    }

    getFiles(): Observable<any> {
        return this.http.get(`${this.baseUrl}/files`);
    }
}