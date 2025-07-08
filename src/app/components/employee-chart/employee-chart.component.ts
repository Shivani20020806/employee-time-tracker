import { Component, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Chart,PieController, ChartConfiguration,Title, Legend, Tooltip, ArcElement, ChartType } from 'chart.js';
import { EmployeeData } from '../../models/employee.model';

Chart.register(PieController, ArcElement, Tooltip, Legend, Title);


@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrls: ['./employee-chart.component.css']
})
export class EmployeeChartComponent implements OnChanges {
  @Input() employees: EmployeeData[] = [];
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  ngOnChanges(): void {
    if (this.employees.length > 0) {
      this.createChart();
    }
  }

  private createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#FF8A80', '#C9CBCF', '#81C784', '#FFB74D',
      '#64B5F6', '#F06292', '#AED581', '#FFD54F', '#90A4AE'
    ];

    const config: ChartConfiguration = {
      type: 'pie' as ChartType,
      data: {
        labels: this.employees.map(emp => emp.name),
        datasets: [{
          data: this.employees.map(emp => emp.percentage),
          backgroundColor: colors.slice(0, this.employees.length),
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Employee Time Distribution (%)',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: 20
          },
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              usePointStyle: true,
              font: {
                size: 12
              },
              generateLabels: (chart) => {
                const data = chart.data;
                if (data.labels && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const employee = this.employees[i];

                    const bg = data.datasets[0].backgroundColor;
                    const border = data.datasets[0].borderColor;
                    const borderWidth = data.datasets[0].borderWidth;

                    const fillStyle = Array.isArray(bg)
                      ? bg[i]
                      : typeof bg === 'string'
                        ? bg
                        : 'gray';

                    const strokeStyle = Array.isArray(border)
                      ? border[i]
                      : typeof border === 'string'
                        ? border
                        : 'black';

                    const lineWidth = typeof borderWidth === 'number'
                      ? borderWidth
                      : Array.isArray(borderWidth)
                        ? borderWidth[i]
                        : 1;

                    return {
                      text: `${label} (${employee.percentage}%)`,
                      fillStyle: fillStyle,
                      strokeStyle: strokeStyle,
                      lineWidth: lineWidth,
                      hidden: false,
                      index: i,
                      pointStyle: 'circle'
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                const employee = this.employees[context.dataIndex];
                return [
                  `Employee: ${employee.name}`,
                  `Hours: ${employee.totalHours}`,
                  `Percentage: ${employee.percentage}%`
                ];
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutBounce'
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }
}
