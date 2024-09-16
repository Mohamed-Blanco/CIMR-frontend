import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjouterProjetComponent } from '../ajouter-projet/ajouter-projet.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [AjouterProjetComponent],
  imports: [CommonModule, FormsModule, DropdownModule],
  exports: [AjouterProjetComponent],
})
export class AjouterProjetModule { }
