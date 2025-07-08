import { Component, Input } from '@angular/core';
import { EmployeeData } from '../../models/employee.model';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent {
  @Input() employees: EmployeeData[] = [];

  isLowHours(hours: number): boolean {
    return hours < 100;
  }
}