import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule, PanelMenuModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
