import { Component, OnInit, ViewChild } from '@angular/core';
import { Collaborateur } from '../../../models/collaborateur';
import { collaborateurservice } from '../../../services/collaborateurs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddCollaborateurComponent } from '../add-collaborateur/add-collaborateur.component';
import { error } from 'console';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Projet } from '../../../models/projet';
import { ProjetCount } from '../../../models/ProjetcountResponse';
import { AjouterProjetComponent } from '../ajouter-projet/ajouter-projet.component';
import { EditCollaborateurComponent } from '../edit-collaborateur/edit-collaborateur.component';
import { authentificationservice } from '../../../services/authentification.service';


@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrl: './collaborateurs.component.css',
})
export class CollaborateursComponent implements OnInit {
  @ViewChild(AddCollaborateurComponent)
  addCollaborateur!: AddCollaborateurComponent;





  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }



  confirm2(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'oulez-vous supprimer ce collaborateur ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "trash",

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmé', detail: 'Collaborateur supprimé' });
        this.ondeleteCollaborateurby(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });

      }
    });
  }

  projetsCount!: number;

  getCountProjetsForCollaborateur(id: number) {
    this.collaborateurservice.getNumberProjetsforcollaborateur(id).subscribe(
      (response: number) => {
        this.projetsCount = response;
        console.log("Number", this.projetsCount);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  me !: Collaborateur;
  Me() {
    this.authentificationservice.me().subscribe((response) => this.me = response, (error) => alert(error));
  }

  onSubmit() {

    let obs = this.addCollaborateur.submitForm();
    if (!obs) return;
    obs.subscribe(
      (response: Collaborateur) => {
        console.log(response);
        this.getCollaborateurs();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Projet a été ajouté ' });

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l ajoute ' });

      },
    )




  }

  public Collaborateurs: ProjetCount[] = [];
  public AllCollaborateurs: ProjetCount[] = [];
  public CollaborateursReal: Collaborateur[] = [];

  onSearchCollaborateurs(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    console.log(searchTerm)

    this.Collaborateurs = this.AllCollaborateurs.filter((item) =>
      item.collaborateur.nom?.toLowerCase().includes(searchTerm) ?? false

    );

    this.Collaborateurs = this.AllCollaborateurs.filter((item) =>
      item.collaborateur.prenom?.toLowerCase().includes(searchTerm) ?? false

    );

    this.Collaborateurs = this.AllCollaborateurs.filter((item) =>
      item.collaborateur.email?.toLowerCase().includes(searchTerm) ?? false

    );

  }

  dropdownstate: boolean[] = [];
  dropdownstate2: boolean[] = [];
  dropmenuvar: boolean[] = [];
  isaddmodalopen: boolean = false;
  showlist: boolean = false;
  Isopen: boolean = false;

  constructor(private authentificationservice: authentificationservice, private collaborateurservice: collaborateurservice, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  public ondeleteCollaborateurby(id: number) {



    this.collaborateurservice.deletecollaborateur(id).subscribe((response: void) => {
      console.log("deleted");
      this.getCollaborateurs();
    }, (error: HttpErrorResponse) => {
      console.log(error.message);
    })


  }

  droplistmenu(i: number): void {
    if (this.dropdownstate2[i] === true) {
      this.dropdownstate2[i] = false;
      return;
    }

    setTimeout(() => {
      document.getElementById('droplist' + i)?.classList.remove('opacity-0');
    }, 1);

    this.dropdownstate2.fill(false);
    this.dropdownstate2[i] = !this.dropdownstate2[i];
  }

  Droptablelistmenu(i: number): void {
    if (this.dropdownstate2[i] === true) {
      this.dropdownstate2[i] = false;
      return;
    }

    setTimeout(() => {
      document.getElementById('droplist' + i)?.classList.remove('opacity-0');
    }, 1);

    this.dropdownstate2.fill(false);
    this.dropdownstate2[i] = !this.dropdownstate2[i];
  }

  isOutletEmpty = true;

  onOutletActivate(): void {
    this.isOutletEmpty = false;
  }

  onOutletDeactivate(): void {
    this.isOutletEmpty = true;
  }

  ngOnInit(): void {
    //console.log(localStorage.getItem("token"))
    this.Me();
    this.getCollaborateurs();
  }



  switchviewlist() {
    this.showlist = !this.showlist;
    console.log(this.showlist);
  }

  public getCollaborateurs(): void {
    //debugger;
    this.collaborateurservice.getCollaborateurs().subscribe(
      (response: ProjetCount[]) => {
        this.Collaborateurs = response;
        this.AllCollaborateurs = response;
        console.log(this.Collaborateurs);

      },
      (error: HttpErrorResponse) => {
        console.log("Error", error.message);
      },
    );
  }


  collaborateurtoedit!: Collaborateur;
  edit: boolean = false;

  OnEdit(collaborateur: Collaborateur) {
    this.edit = true;
    this.collaborateurtoedit = collaborateur;
  }


  @ViewChild(EditCollaborateurComponent)
  editCollaborateur!: EditCollaborateurComponent;


  onSubmitEdit() {

    let obs = this.editCollaborateur.submitForm();
    if (!obs) return;
    obs.subscribe(
      (response: Collaborateur) => {
        console.log(response);
        this.getCollaborateurs();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'les informations du Collaborateur sont modifier' });

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    )

  }


  dropmenu(i: number): void {
    if (this.dropdownstate[i] === true) {
      this.dropdownstate[i] = false;
      return;
    }

    setTimeout(() => {
      document
        .getElementById('dropdownmenu' + i)
        ?.classList.remove('opacity-0');
    }, 1);

    this.dropdownstate.fill(false);
    this.dropdownstate[i] = !this.dropdownstate[i];
  }
}
