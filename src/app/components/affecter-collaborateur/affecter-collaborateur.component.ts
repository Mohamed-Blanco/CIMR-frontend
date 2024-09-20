import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Collaborateur } from '../../../models/collaborateur';
import { ProjteService } from '../../../services/projet.service';
import { collaborateurservice } from '../../../services/collaborateurs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjetCollaborateur } from '../../../models/ProjetCollaborateur';
import { Projet } from '../../../models/projet';

@Component({
  selector: 'app-affecter-collaborateur',
  templateUrl: './affecter-collaborateur.component.html',
  styleUrl: './affecter-collaborateur.component.css',
})
export class AffecterCollaborateurComponent implements OnInit {

  collaborateurs !: Collaborateur[];
  @Input() projetId !: number | null;
  @Output("GetProjets") GetProjets: EventEmitter<any> = new EventEmitter();
  collabprojet !: ProjetCollaborateur;

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


  AssignCollaborateurToProjet(idCollaborateur: number) {
    let collabProjetRequest = new ProjetCollaborateur();

    let prReq = new Projet();
    prReq.id = this.projetId;

    let collReq = new Collaborateur();
    collReq.id = idCollaborateur;

    collabProjetRequest.projet = prReq;
    collabProjetRequest.collaborateur = collReq;

    this.projetservice.assignCollaborateur(collabProjetRequest).subscribe(
      (response: ProjetCollaborateur) => {
        console.log("Response : " + response);
        this.getCollaborateurs(this.projetId);
        this.GetProjets.emit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }






}
