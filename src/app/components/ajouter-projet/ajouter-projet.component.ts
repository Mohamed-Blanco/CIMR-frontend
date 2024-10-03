import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjteService } from '../../../services/projet.service';
import { DepartementService } from '../../../services/departement.service';
import { departement } from '../../../models/departement';
import { HttpErrorResponse } from '@angular/common/http';
import { Projet } from '../../../models/projet';
import { PlanificationService } from '../../../services/planification.service';
import { Planification } from '../../../models/planification';
import { error } from 'console';
import { Trimestre } from '../../../models/trimestre';

@Component({
  selector: 'app-ajouter-projet',
  templateUrl: './ajouter-projet.component.html',
  styleUrl: './ajouter-projet.component.css',
})
export class AjouterProjetComponent implements OnInit {


  ngOnInit(): void {
    this.getAlldepartement();
    console.log(this.departement);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['trimestretoadd']) {
      console.log('Trimestre To add:', this.trimestretoadd);
      // Do something with the new value
    }
  }

  ngAfterViewInit(): void {

    console.log('Trimestre To add:', this.trimestretoadd);
    // Do something with the new value
  }

  @Input() trimestretoadd !: number | undefined;

  constructor(private departementservice: DepartementService, private projetservice: ProjteService, private planificationservice: PlanificationService) { }

  @ViewChild('addprojetForm') form!: NgForm;
  departement: departement[] = [];
  SelectedDepartement !: departement | null;


  localdate: Date = new Date();
  onaddProjet(addprojetForm: NgForm): void {
  }



  submitForm() {
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
      let projectRequest: Projet = new Projet();
      projectRequest.titre = this.form.value.titre;
      projectRequest.datedebut = this.form.value.datedebut;
      projectRequest.remarque = this.form.value.remarque;
      projectRequest.datelimie = this.form.value.datelimite;
      projectRequest.remarque = this.form.value.remarque;
      projectRequest.chargeAS400 = this.form.value.chargeAS400;
      projectRequest.chargeNTIC = this.form.value.chargeNTIC;
      projectRequest.infra = this.form.value.infra;
      projectRequest.analyse = this.form.value.analyse;
      projectRequest.integrationcoordination = this.form.value.integrationcoordination;
      projectRequest.controlequalite = this.form.value.controlequalite;


      let date = new Date();
      projectRequest.creele = date;

      let depRq = new departement();
      depRq = this.form.value.departement;

      let TriRq = new Trimestre();
      TriRq.id = this.trimestretoadd;

      projectRequest.trimestre = TriRq;

      projectRequest.departement = depRq;

      return this.projetservice.addProjet(projectRequest);
    } else {
      console.log('Form is invalid');
      return null;
    }
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





}
