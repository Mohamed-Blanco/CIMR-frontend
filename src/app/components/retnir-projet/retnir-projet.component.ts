import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Projet } from '../../../models/projet';
import { departement } from '../../../models/departement';
import { DepartementService } from '../../../services/departement.service';
import { ProjteService } from '../../../services/projet.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Trimestre } from '../../../models/trimestre';
import { TrimestreService } from '../../../services/trimestre.service';
import { Console } from 'console';

@Component({
  selector: 'app-retnir-projet',
  templateUrl: './retnir-projet.component.html',
  styleUrl: './retnir-projet.component.css'
})
export class RetnirProjetComponent implements OnInit {

  @ViewChild('retenirprojetForm') form!: NgForm;
  @Input() ProjetToRetnir !: Projet;

  TrimestreId !: number | undefined;
  departement: departement[] = [];
  SelectedDepartement !: departement | null;

  constructor(private departementservice: DepartementService, private projetservice: ProjteService, private trimestreservice: TrimestreService) { }

  ngOnInit(): void {
    console.log("Projet a Retenir Nom , id " + this.ProjetToRetnir.trimestre);
    this.getAlldepartement();
    console.log(this?.ProjetToRetnir);

    this.getcurrentTrimestre();
    this.SelectedDepartement = this.ProjetToRetnir.departement;
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

  public getcurrentTrimestre() {


    this.trimestreservice.CurrentTrimestre().subscribe(
      (response: Trimestre) => {
        this.TrimestreId = response.id;
        console.log("Current Trimestre name and id  : " + response.nomtrimestre + response.id);
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      })
  }



  submitForm() {

    if (this.form.valid && this.TrimestreId) {
      console.log('Form submitted');

      let projectRequest: Projet = new Projet();


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
      projectRequest.retenir = true;

      let triRq = new Trimestre();
      triRq.id = this.TrimestreId;

      projectRequest.trimestre = triRq;

      let depRq = new departement();
      depRq = this.form.value.departement;

      projectRequest.departement = depRq;

      console.log("This is Your Request : " + triRq);
      console.log("vous ne pouver pas retenir se projet , car il est déga integrée sur " + this.ProjetToRetnir);

      return this.projetservice.addProjet(projectRequest);
    } else {
      console.log('Form is invalid');
      return null;
    }

  }

}

