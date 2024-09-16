import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProjetComponent } from './view-projet.component';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from 'primeng/dragdrop';
import { AjouterProjetModule } from '../ajouter-projet/ajouter-projet.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddActionModule } from '../add-action/add-action.module';
import { AffecterCollaborateurModule } from '../affecter-collaborateur/affecter-collaborateur.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { EditActionModule } from '../edit-action/edit-action.module';

@NgModule({
  declarations: [ViewProjetComponent],
  imports: [
    CommonModule,
    TableModule,
    BrowserAnimationsModule,
    DragDropModule,
    AjouterProjetModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    AddActionModule,
    AffecterCollaborateurModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    EditActionModule
  ],
  exports: [ViewProjetComponent],
})
export class ViewProjetModule { }
