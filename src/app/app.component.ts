import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { EmployeeData } from './models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Time Tracker';
  employees: EmployeeData[] = [];
  loading = true;
  error: string | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    this.loading = true;
    this.error = null;
    this.employeeService.getEmployeeData().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load employee data';
        this.loading = false;
        console.error('Error loading employee data:', error);
      }
    });
  }
}