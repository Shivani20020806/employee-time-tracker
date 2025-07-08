import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TimeEntry, EmployeeData } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

  constructor(private http: HttpClient) {}

  getEmployeeData(): Observable<EmployeeData[]> {
    return this.http.get<TimeEntry[]>(this.apiUrl).pipe(
      map(entries => this.processTimeEntries(entries))
    );
  }

  private processTimeEntries(entries: TimeEntry[]): EmployeeData[] {
    const employeeMap = new Map<string, number>();

    // Calculate total hours for each employee
    entries.forEach(entry => {
      if (!entry.DeletedOn) { // Only process non-deleted entries
        const startTime = new Date(entry.StarTimeUtc);
        const endTime = new Date(entry.EndTimeUtc);
        const hoursWorked = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

        if (employeeMap.has(entry.EmployeeName)) {
          employeeMap.set(entry.EmployeeName, employeeMap.get(entry.EmployeeName)! + hoursWorked);
        } else {
          employeeMap.set(entry.EmployeeName, hoursWorked);
        }
      }
    });

    // Convert to array and calculate percentages
    const employeeArray: EmployeeData[] = Array.from(employeeMap.entries()).map(([name, hours]) => ({
      name,
      totalHours: Math.round(hours * 100) / 100, // Round to 2 decimal places
      percentage: 0 // Will be calculated below
    }));

    // Calculate total hours for percentage calculation
    const totalHours = employeeArray.reduce((sum, emp) => sum + emp.totalHours, 0);

    // Calculate percentages
    employeeArray.forEach(emp => {
      emp.percentage = Math.round((emp.totalHours / totalHours) * 100 * 100) / 100;
    });

    // Sort by total hours worked (descending)
    return employeeArray.sort((a, b) => b.totalHours - a.totalHours);
  }
}
