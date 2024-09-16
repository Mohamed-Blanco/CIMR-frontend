import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProjteService } from '../../../services/projet.service';
import { Projet } from '../../../models/projet';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborateur } from '../../../models/collaborateur';
import { response } from 'express';
import { Console, error } from 'console';
import { actionservice } from '../../../services/action.service';
import { Action } from '../../../models/action';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-projet',
  templateUrl: './view-projet.component.html',
  styleUrl: './view-projet.component.css',
})
export class ViewProjetComponent implements OnInit {
  id !: number;
  edittext: boolean = false;
  projets!: Projet;
  project$!: Observable<any>;
  collaborateurs !: Collaborateur[];
  ActionToEdit !: Action;
  visibleedit: boolean = false;

  showEdit() {
    this.i++;
    this.visibleedit = !this.visibleedit
    this.getAllActions(this.id);
    console.log("Editing : ");
    if (this.i % 2 == 0) {
      this.ActionEdit();
    }
  }





  constructor(
    private projetsService: ProjteService,
    private route: ActivatedRoute,
    private actionservice: actionservice,
    private messageService: MessageService
  ) { }

  public getprojetbyid(id: number): void {
    this.projetsService.getProjetbyId(id).subscribe(
      (response: Projet) => {
        this.projets = response;
        console.log("Project" + response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }


  visible: boolean = false;
  i: number = 0;

  showDialog(): void {
    this.i++;
    this.visible = !this.visible
    this.getAllActions(this.id);
    console.log(this.i)
    if (this.i % 2 == 0) {
      this.ActionCreated();
    }
  }

  visible2: boolean = false;
  ActionToedit !: Action;

  PassAction(action: Action) {
    this.ActionToedit = action;
    console.log("Working ");
  }

  showDialog2(): void {
    console.log("Working ");
    this.visible2 = !this.visible2
    this.getAllActions(this.id);
    if (this.i % 2 == 0) {
      this.ActionCreated();
    }
  }



  public getprojetCollaborateurs(id: number): void {
    this.projetsService.getCollaborateurs(id).subscribe(
      (response: Collaborateur[]) => {
        this.collaborateurs = response;
        console.log("collaborateur " + this.collaborateurs);
      },
      (error: HttpErrorResponse) => {

        console.log();
      }
    )
  }

  OnSuprimer(action: Action): void {
    console.log("Projet a suprimer : " + action);
    this.actionservice.deleteAction(action.id).subscribe(
      (response: void) => {
        console.log("Projet Suprimer ! " + response);
        this.getAllActions(this.projets.id);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }


  private activatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getprojetbyid(this.id);
    this.getprojetCollaborateurs(this.id);
    this.getAllActions(this.id);
    console.log("Actions" + this.Actions);


  }


  dropmenu: boolean = false;
  Actions !: Action[];
  OnDropMenu(id: number | null) {
    console.log(id);
    this.dropmenu = !this.dropmenu;
    setTimeout(() => {
      document.getElementById("drop" + id)?.classList.remove("opacity-0");
      document.getElementById("drop" + id)?.classList.add("opacity-100");
    }, 2)

  }

  ActionEdit() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Votre Action a était Bien Ajouter ',
    });
  }


  ActionCreated() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Votre Action a était Bien Ajouter ',
    });
  }

  getAllActions(id: number | null): void {
    this.actionservice
      .getProjetActions(id)
      .subscribe(
        (response: Action[]) => {

          this.Actions = response;

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      );
    console.log("Refreshed !!!!" + this.id);
  }

  SetCompleted(action: Action) {
    let actionRequest = new Action();
    actionRequest.id = action.id;
    this.actionservice
      .SetCompletedAction(actionRequest)
      .subscribe(
        (response: Action) => {
          console.log("Completed : " + response);
          this.getAllActions(this.id);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      );
    this.getAllActions(this.projets.id);
  }


  SetUncompleted(action: Action) {


    let actionRequest = new Action();
    actionRequest.id = action.id;
    this.actionservice
      .SetUnCompletedAction(actionRequest)
      .subscribe(
        (response: Action) => {
          console.log("Uncompleted : " + response);
          this.getAllActions(this.id);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      );


  }

  SetAnnuler(Action: Action) {
    this.actionservice
      .SetAnnulerAction(Action)
      .subscribe(
        (response: Action) => {
          console.log("Annuler " + response);
          this.getAllActions(this.id);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      );
    this.getAllActions(this.id);
  }

}
