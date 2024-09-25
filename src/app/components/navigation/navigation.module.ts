import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule, PanelMenuModule, ButtonModule, DialogModule],
  exports: [NavigationComponent],
})
export class NavigationModule { }
