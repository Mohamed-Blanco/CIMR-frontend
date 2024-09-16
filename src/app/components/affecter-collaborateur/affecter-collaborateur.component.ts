import { Component, Input, OnInit } from '@angular/core';
import { Collaborateur } from '../../../models/collaborateur';
import { ProjteService } from '../../../services/projet.service';
import { collaborateurservice } from '../../../services/collaborateurs.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-affecter-collaborateur',
  templateUrl: './affecter-collaborateur.component.html',
  styleUrl: './affecter-collaborateur.component.css',
})
export class AffecterCollaborateurComponent implements OnInit {

  collaborateurs !: Collaborateur[];
  @Input() projetId !: number | null;

  public getCollaborateurs(id: number | null): void {
    this.collaborateurservice.getCollaborateursNotInProjet(id).subscribe(
      (response: Collaborateur[]) => {
        this.collaborateurs = response;
        console.log(this.collaborateurs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  constructor(private projetservice: ProjteService, private collaborateurservice: collaborateurservice) {

  }


  ngOnInit(): void {
    this.getCollaborateurs(this.projetId);
  }

  getAllCollaborateurs() {

  }

  AssignCollaborateurToProjet(idCollaborateur: number, idProjet: number | null) {
    this.projetservice.assignCollaborateur(idCollaborateur, idProjet).subscribe(
      (response: Collaborateur[]) => {
        this.collaborateurs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }


}
