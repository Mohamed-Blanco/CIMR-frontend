import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { actionservice } from '../../../services/action.service';
import { Action } from '../../../models/action';
import { Competence } from '../../../models/competence';
import { Projet } from '../../../models/projet';
import { authentificationservice } from '../../../services/authentification.service';

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
  SelectedCompetence!: Competence;
  dateLIMITE !: String;
  constructor(private actionservice: actionservice, private athentificationService: authentificationservice, private messageService: MessageService) {

  }

  ngOnInit(): void {

    this.SelectedCompetence = this.action.competence;
    let date = new Date;
    this.dateLIMITE = date.toString();
    this.SelectedCompetence = this.action.competence;
    this.getAllcompetence();

  }

  getAllcompetence() {

    this.athentificationService.Allcompetences().subscribe((response: Competence[]) => {

      this.Competence = response;

    }, (error) => {
      alert(error.message);
    });
  }


  OnSubmit() {

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





      return this.actionservice.updateAction(ActionRequest).subscribe((response: Action) => {
        this.showedit();
        this.showEdit.emit();
        this.messageService.add({
          severity: 'info',
          summary: 'Modifier',
          detail: 'Votre Action a etait bien modifier',
        });
      }, (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Erreur lors de la modification de votre action ',
        });
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










