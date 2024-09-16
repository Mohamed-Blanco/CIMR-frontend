import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddActionComponent } from '../add-action/add-action.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AddActionComponent],
  imports: [CommonModule, IconFieldModule,
    ToastModule,
    ButtonModule,
    RippleModule, DropdownModule, FormsModule, CalendarModule],
  exports: [AddActionComponent],
})
export class AddActionModule {


}
