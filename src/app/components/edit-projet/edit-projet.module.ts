import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProjetComponent } from './edit-projet.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [EditProjetComponent],
  imports: [CommonModule, FormsModule, DropdownModule],
  exports: [EditProjetComponent],
})
export class EditProjetModule { }
