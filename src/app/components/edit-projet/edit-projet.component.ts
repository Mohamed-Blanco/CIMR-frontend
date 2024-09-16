import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DepartementService } from '../../../services/departement.service';
import { ProjteService } from '../../../services/projet.service';
import { PlanificationService } from '../../../services/planification.service';
import { NgForm } from '@angular/forms';
import { departement } from '../../../models/departement';
import { Projet } from '../../../models/projet';
import { HttpErrorResponse } from '@angular/common/http';
import { Trimestre } from '../../../models/trimestre';

@Component({
  selector: 'app-edit-projet',
  templateUrl: './edit-projet.component.html',
  styleUrl: './edit-projet.component.css',
})
export class EditProjetComponent implements OnInit {

  @ViewChild('editprojetForm') form!: NgForm;

  constructor(private departementservice: DepartementService, private projetservice: ProjteService) { }


  ngOnInit(): void {

    this.getAlldepartement();
    console.log(this?.ProjetToEdit);
    this.SelectedDepartement = this.ProjetToEdit.departement;
  }

  @Input() ProjetToEdit !: Projet;
  @Input() TrimestreId !: number | undefined;

  departement: departement[] = [];
  SelectedDepartement !: departement | null;

  ngOnChanges() {

    console.log("Trimestre To edit In ", this.TrimestreId);
  }


  public getAlldepartement(): void {
    this.departementservice.getdepartements().subscribe(
      (response: departement[]) => {
        this.departement = response;
        console.log("Departements : " + response);
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      })
  }


  submitForm() {
    if (this.form.valid) {
      console.log('Form submitted');

      let projectRequest: Projet = new Projet();

      projectRequest.id = this.ProjetToEdit.id;
      projectRequest.titre = this.form.value.titre;
      projectRequest.datedebut = this.form.value.datedebut;
      projectRequest.datelimie = this.form.value.datelimite;
      projectRequest.remarque = this.form.value.remarque;
      projectRequest.chargeAS400 = this.form.value.chargeAS400;
      projectRequest.chargeNTIC = this.form.value.chargeNTIC;
      projectRequest.infra = this.form.value.infra;
      projectRequest.analyse = this.form.value.analyse;
      projectRequest.integrationcoordination = this.form.value.integrationcoordination;
      projectRequest.controlequalite = this.form.value.controlequalite;

      let triRq = new Trimestre();
      triRq.id = this.TrimestreId;

      projectRequest.trimestre = triRq;

      let depRq = new departement();
      depRq = this.form.value.departement;

      projectRequest.departement = depRq;

      console.log(projectRequest);
      return this.projetservice.editProjet(projectRequest);
    } else {
      console.log('Form is invalid');
      return null;
    }
  }

}
