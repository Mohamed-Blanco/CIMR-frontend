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
import { authentificationservice } from '../../../services/authentification.service';
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
  SelectedCompetence !: Competence;
  @ViewChild('ajouterActionForm') form!: NgForm;
  value!: string


  constructor(private actionservice: actionservice, private messageService: MessageService, private athentificationService: authentificationservice) {

  }
  date = new Date();

  OnSubmit() {

    console.log("Submited");
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);

      let ActionRequest: Action = new Action();


      let compReq = new Competence();
      compReq.id = this.form.value.competence.id;
      ActionRequest.competence = compReq;

      ActionRequest.charge = this.form.value.charge;
      ActionRequest.contenue = this.form.value.contenue;
      ActionRequest.nomaction = this.form.value.nomaction;
      ActionRequest.datelimite = this.form.value.datelimite;

      let ProjRq = new Projet();
      ProjRq.id = this.projet.id;
      ActionRequest.projet = ProjRq;
      ActionRequest.etat = "Pas encore Commencé";


      console.log("Request " + ActionRequest.competence.id);


      return this.actionservice.addAction(ActionRequest).subscribe((response: Action) => {
        console.log(response);
        this.showDialog.emit();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Votre Action a était Bien Ajouter ',
        });
      }, (error: HttpErrorResponse) => {
        alert(error.message);
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'erreur lors de la supression',
        });
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

    this.getAllcompetence();

  }


  getAllcompetence() {

    this.athentificationService.Allcompetences().subscribe((response: Competence[]) => {

      this.Competence = response;
      console.log("Alll Competences " + this.Competence);

    }, (error) => {
      console.error(' register error: ', error);
    });
  }
  Annuler() {

    this.showDialog.emit();
  }


}
