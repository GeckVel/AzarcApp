import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Employee } from '../core/models/employee.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employeesList!: Employee[];
  searchControl = new FormControl();
  searchText = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.getAllEmployees()
      .subscribe(data => {
        this.employeesList = data;
      });

  }


}
