import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeChartComponent } from './components/employee-chart/employee-chart.component';

// Import Chart.js components
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTableComponent,
    EmployeeChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
