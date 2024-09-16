import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planification } from '../models/planification';
import { envirenement } from '../app/envirenement/envirenement';
import { Trimestre } from '../models/trimestre';

@Injectable({
  providedIn: 'root',
})
export class PlanificationService {
  private apiServerUrl = envirenement.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPlanifications(): Observable<Planification[]> {
    return this.http.get<Planification[]>(
      `${this.apiServerUrl}/Planification/all`,
    );
  }


  public deletePlanificationById(id: number | null): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Planification/delete/` + id);
  }



  public getCurrentPlanification(): Observable<Planification> {
    return this.http.get<Planification>(
      `${this.apiServerUrl}/Planification/Current`,
    );
  }

  public getPlanification(id: number | null): Observable<Planification> {
    return this.http.get<Planification>(
      `${this.apiServerUrl}/Planification/find` + id,
    );
  }

  public addPlanification(
    planification: Planification,
  ): Observable<Planification> {
    return this.http.post<Planification>(
      `${this.apiServerUrl}/Planification/add`,
      planification,
    );
  }
}
