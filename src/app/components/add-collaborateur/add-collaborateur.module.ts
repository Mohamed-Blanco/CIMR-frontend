import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCollaborateurComponent } from './add-collaborateur.component';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [AddCollaborateurComponent],
  imports: [CommonModule, FormsModule, PasswordModule, InputTextareaModule
  ],
  exports: [AddCollaborateurComponent],
})
export class AddCollaborateurModule { }
