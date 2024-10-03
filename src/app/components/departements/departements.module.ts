import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartementsComponent } from './departements.component';
import { DialogModule } from 'primeng/dialog';
import { Button, ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DepartementsComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    FormsModule
  ], exports: [
    DepartementsComponent
  ]
})
export class DepartementsModule { }
