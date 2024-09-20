import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationComponent } from './authentification.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [AuthentificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  exports: [
    AuthentificationComponent
  ]
})
export class AuthentificationModule {



}
