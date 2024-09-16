import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaborateursComponent } from './collaborateurs.component';
import { AddCollaborateurModule } from '../add-collaborateur/add-collaborateur.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import { AjouterProjetModule } from '../ajouter-projet/ajouter-projet.module';
import { EditProjetModule } from '../edit-projet/edit-projet.module';
import { EditCollaborateurModule } from '../edit-collaborateur/edit-collaborateur.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CollaborateursComponent],
  imports: [
    CommonModule,
    AddCollaborateurModule,
    TableModule,
    BrowserAnimationsModule,
    DragDropModule,
    RouterOutlet,
    RouterLink,
    EditCollaborateurModule, ConfirmDialogModule, ToastModule, ButtonModule
  ],
  exports: [CollaborateursComponent],
  providers: [ConfirmationService, MessageService]
})
export class CollaborateursModule { }
