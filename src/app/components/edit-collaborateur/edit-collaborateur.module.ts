import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCollaborateurComponent } from './edit-collaborateur.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [EditCollaborateurComponent],
  imports: [CommonModule, FormsModule, PasswordModule, InputTextareaModule,
    DropdownModule],
  exports: [EditCollaborateurComponent],
})
export class EditCollaborateurModule { }
