import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacitiesComponent } from './capacities.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CapacitiesComponent],
  imports: [
    CommonModule, CalendarModule, FormsModule, RouterModule
  ],
  exports: [CapacitiesComponent]
})
export class CapacitiesModule {




}
