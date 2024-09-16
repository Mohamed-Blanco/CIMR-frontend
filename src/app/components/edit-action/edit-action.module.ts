import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditActionComponent } from './edit-action.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';



@NgModule({
  declarations: [
    EditActionComponent
  ],
  imports: [
    CommonModule, ToastModule,
    ButtonModule,
    RippleModule, DropdownModule, FormsModule, CalendarModule
  ],
  exports: [
    EditActionComponent
  ]
})
export class EditActionModule { }
