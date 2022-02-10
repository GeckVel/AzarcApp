import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterEmployeesPipe } from '../core/pipes/filter-employees.pipe';
import { MatInputModule } from "@angular/material/input";



@NgModule({
  declarations: [DashboardComponent, FilterEmployeesPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      }
    ]),
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class DashboardModule { }
