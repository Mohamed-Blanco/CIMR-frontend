import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomecomponentComponent } from './homecomponent.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationModule } from '../navigation/navigation.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomecomponentComponent
  ],
  imports: [
    CommonModule, NavigationModule, RouterModule
  ], exports: [
    HomecomponentComponent
  ]
})
export class HomecomponentModule { }
