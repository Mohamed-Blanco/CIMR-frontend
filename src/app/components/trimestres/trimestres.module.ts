import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimestresComponent } from './trimestres.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { YearPipe } from '../YearPipe';

@NgModule({
  declarations: [TrimestresComponent, YearPipe],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    TableModule,
    BrowserAnimationsModule,
    DragDropModule,
    RouterOutlet,
    RouterLink,
    IconFieldModule,
    ToastModule,
    ButtonModule,
    RippleModule,

  ],
  exports: [TrimestresComponent],
})
export class TrimestresModule { }
