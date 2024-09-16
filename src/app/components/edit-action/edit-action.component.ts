import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { actionservice } from '../../../services/action.service';
import { Action } from '../../../models/action';
import { competence } from '../../../models/competence';
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
  Competence !: competence[];
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
      { name: "DEV AS400" },
      { name: "DEV NTIC" },
      { name: "DEV Analyse" },
      { name: "Integration-Coordination" },
      { name: "Controle-Qualite" },
    ]
  }


  OnSubmit() {

    console.log("Submited");
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);

      let ActionRequest: Action = new Action();
      ActionRequest.id = this.action.id;
      ActionRequest.competence = this.SelectedCompetence;
      ActionRequest.charge = this.form.value.charge;
      ActionRequest.contenue = this.form.value.contenue;
      ActionRequest.nomaction = this.form.value.nomaction;
      ActionRequest.datelimite = this.form.value.datelimite;
      ActionRequest.dateaction = this.action.dateaction;
      ActionRequest.projet = this.action.projet;
      ActionRequest.etat = "Pas encore Commencé";


      console.log("Request" + ActionRequest);


      return this.actionservice.updateAction(ActionRequest).subscribe((response: Action) => {
        console.log(response);
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

  }


  show() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Echec',
      detail: 'Veuiller Remplir Tout les champs de votre Action',
    });
  }

}










