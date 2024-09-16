import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCollaborateurComponent } from '../view-collaborateur/view-collaborateur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ViewCollaborateurComponent],
  imports: [
    CommonModule,
    TableModule,
    BrowserAnimationsModule,
    DragDropModule,
    RouterOutlet,
    RouterLink,


  ],
  exports: [ViewCollaborateurComponent],
})
export class ViewCollaborateurModule { }
