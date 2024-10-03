import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetsComponent } from './projets.component';
import { ReorderableRow } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DragDropModule } from 'primeng/dragdrop';
import { AjouterProjetComponent } from '../ajouter-projet/ajouter-projet.component';
import { AjouterProjetModule } from '../ajouter-projet/ajouter-projet.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CollaPipe } from '../collaborateursPipe';
import { EditProjetModule } from '../edit-projet/edit-projet.module';
import { AddCollaborateurModule } from '../add-collaborateur/add-collaborateur.module';
import { AddActionModule } from '../add-action/add-action.module';
import { TrimestresModule } from '../trimestres/trimestres.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RetnirProjetModule } from '../retnir-projet/retnir-projet.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [ProjetsComponent, CollaPipe],
  imports: [
    CommonModule,
    TableModule,
    BrowserAnimationsModule,
    DragDropModule,
    AjouterProjetModule,
    RouterOutlet,
    RouterLink,
    EditProjetModule,
    AddCollaborateurModule,
    AddActionModule,
    TrimestresModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    RetnirProjetModule,
    ToastModule

  ],
  exports: [ProjetsComponent],
})
export class ProjetsModule { }
