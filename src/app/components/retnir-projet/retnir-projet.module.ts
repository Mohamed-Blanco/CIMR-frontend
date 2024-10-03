import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetnirProjetComponent } from './retnir-projet.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [RetnirProjetComponent],
  imports: [CommonModule, FormsModule, DropdownModule]
  , exports: [
    RetnirProjetComponent
  ]
})
export class RetnirProjetModule { }
