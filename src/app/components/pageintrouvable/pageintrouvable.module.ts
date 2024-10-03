import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageintrouvableComponent } from './pageintrouvable.component';
import { Router } from 'express';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PageintrouvableComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    PageintrouvableComponent
  ]
})
export class PageintrouvableModule { }
