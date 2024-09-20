import { Component, EventEmitter, Input, OnInit, output, Output, ViewChild } from '@angular/core';
import { Competence } from '../../../models/competence';
import { NgForm } from '@angular/forms';
import { Action } from '../../../models/action';
import { actionservice } from '../../../services/action.service';
import { Projet } from '../../../models/projet';
import { HttpErrorResponse } from '@angular/common/http';
import e, { response } from 'express';
import { error } from 'console';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrl: './add-action.component.css',
})


export class AddActionComponent implements OnInit {

  @Output("showDialog") showDialog: EventEmitter<any> = new EventEmitter();
  @Input() projet !: Projet;
  Actions !: Action[];
  date2: Date | undefined;


  Competence !: Competence[];
  SelectedCompetence: any;
  @ViewChild('ajouterActionForm') form!: NgForm;
  value!: string


  constructor(private actionservice: actionservice, private messageService: MessageService) {

  }
  date = new Date();

  OnSubmit() {

    console.log("Submited");
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);

      let ActionRequest: Action = new Action();
      ActionRequest.competence = this.form.value.competence.name;
      ActionRequest.charge = this.form.value.charge;
      ActionRequest.contenue = this.form.value.contenue;
      ActionRequest.nomaction = this.form.value.nomaction;
      ActionRequest.datelimite = this.form.value.datelimite;

      let ProjRq = new Projet();
      ProjRq.id = this.projet.id;
      ActionRequest.projet = ProjRq;
      ActionRequest.etat = "Pas encore Commencé";


      console.log(ActionRequest);


      return this.actionservice.addAction(ActionRequest).subscribe((response: Action) => {
        console.log(response);
        this.showDialog.emit();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      });


    } else {
      console.log('Form is invalid');
      this.show();
      return null;
    }

  }


  show() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Echec',
      detail: 'Veuiller Remplir Tout les champs de votre Action',
    });
  }






  ngOnInit(): void {
    console.log("Add Action : ");
    console.log("Projet", this.projet);


    this.Competence = [
      { titrecompetence: "DEV AS400" },
      { titrecompetence: "DEV NTIC" },
      { titrecompetence: "DEV Analyse" },
      { titrecompetence: "Integration-Coordination" },
      { titrecompetence: "Controle-Qualite" },
    ]
  }

  Annuler() { }


}
