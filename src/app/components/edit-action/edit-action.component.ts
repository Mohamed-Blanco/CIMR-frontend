import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { actionservice } from '../../../services/action.service';
import { Action } from '../../../models/action';
import { Competence } from '../../../models/competence';
import { Projet } from '../../../models/projet';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrl: './edit-action.component.css'
})
export class EditActionComponent implements OnInit {

  @Output("showEdit") showEdit: EventEmitter<any> = new EventEmitter();
  @Input() action !: Action;
  @ViewChild('editActionForm') form!: NgForm;
  value!: string;
  Competence !: Competence[];
  SelectedCompetence!: string;
  dateLIMITE !: String;
  constructor(private actionservice: actionservice, private messageService: MessageService) {

  }

  ngOnInit(): void {
    console.log("Add Action : " + this.action);
    let date = new Date;
    this.dateLIMITE = date.toString();
    this.SelectedCompetence = this.action.competence;

    this.Competence = [
      { titrecompetence: "DEV AS400" },
      { titrecompetence: "DEV NTIC" },
      { titrecompetence: "DEV Analyse" },
      { titrecompetence: "Integration-Coordination" },
      { titrecompetence: "Controle-Qualite" },
    ]
  }


  OnSubmit() {

    console.log("Submited");
    if (this.form.valid) {

      let ActionRequest: Action = new Action();

      let projRequ = new Projet();
      projRequ.id = this.action.projet.id;

      ActionRequest.id = this.action.id;
      ActionRequest.competence = this.SelectedCompetence;
      ActionRequest.charge = this.form.value.charge;
      ActionRequest.contenue = this.form.value.contenue;
      ActionRequest.nomaction = this.form.value.nomaction;
      ActionRequest.datelimite = this.form.value.datelimite;
      ActionRequest.dateaction = this.action.dateaction;
      ActionRequest.projet = projRequ;
      ActionRequest.etat = "Pas encore Commencé";


      console.log("Request" + JSON.stringify(ActionRequest));



      return this.actionservice.updateAction(ActionRequest).subscribe((response: Action) => {
        console.log(response);
        this.showedit();
        this.showEdit.emit();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      });


    } else {
      console.log('Form is invalid');
      this.show();
      return null;
    }

  }


  Annuler() {
    this.showEdit.emit;
  }


  show() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Echec',
      detail: 'Veuiller Remplir Tout les champs de votre Action',
    });
  }

  showedit() {
    this.messageService.add({
      severity: 'info',
      summary: 'Modifier',
      detail: 'Votre Action a etait bien modifier',
    });
  }

}










