import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationComponent } from './authentification.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [AuthentificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    DialogModule,
    ButtonModule
  ],
  exports: [
    AuthentificationComponent
  ]
})
export class AuthentificationModule {



}
