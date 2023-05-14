import { Component, OnInit } from '@angular/core';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from './dashboard.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true
})
export class DashboardComponent implements OnInit {

  userCount: number = 0;
  ambulanceCount: number = 0;
  crewMemberCount: number = 0;
  hospitalCount: number = 0;
  hospitalUserCount: number = 0;
  systemUserCount: number = 0;
  completedBookingCount: number = 0;
  pendingBookingCount: number = 0;

  dates: string[] = [];
  counts: number[] = [];

  /**
   * Apex chart
   */
  public monthlyBookingsChartOptions: any = {};

  // colors and font variables for apex chart 
  obj = {
    primary: "#6571ff",
    secondary: "#7987a1",
    success: "#05a34a",
    info: "#66d1d1",
    warning: "#fbbc06",
    danger: "#ff3366",
    light: "#e9ecef",
    dark: "#060c17",
    muted: "#7987a1",
    gridBorder: "rgba(77, 138, 240, .15)",
    bodyColor: "#000",
    cardBg: "#fff",
    fontFamily: "'Roboto', Helvetica, sans-serif"
  }

  /**
   * NgbDatepicker
   */
  currentDate: NgbDateStruct;

  constructor(
    private calendar: NgbCalendar,
    private dashboardService: DashboardService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {

    this.getSummary();
    this.getPastMonthBookingSummary();

    this.currentDate = this.calendar.getToday();

    // this.monthlyBookingsChartOptions = getMonthlyBookingsChartOptions(this.obj, this.dates, this.counts);

    // Some RTL fixes. (feel free to remove if you are using LTR))
    if (document.querySelector('html')?.getAttribute('dir') === 'rtl') {
      this.addRtlOptions();
    }

  }

  async getSummary() {
    try {

      const response = await this.dashboardService.getSummary();
      if (response.status == 200) {
        this.userCount = response.data.userCount;
        this.ambulanceCount = response.data.ambulanceCount;
        this.crewMemberCount = response.data.crewMemberCount;
        this.hospitalCount = response.data.hospitalCount;
        this.hospitalUserCount = response.data.hospitalUserCount;
        this.systemUserCount = response.data.systemUserCount;
        this.completedBookingCount = response.data.completedBookingCount;
        this.pendingBookingCount = response.data.pendingBookingCount;
      }

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async getPastMonthBookingSummary() {
    try {

      const response = await this.dashboardService.getBookingSummaryForPastMonth();
      if (response.status == 200) {

        response.data.forEach((data: any) => {
          this.dates.push(data.date);
          this.counts.push(data.count);
        });

        this.monthlyBookingsChartOptions = getMonthlyBookingsChartOptions(this.obj, this.dates, this.counts);

      }

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  addRtlOptions() {

    //  Monthly bookings chart
    this.monthlyBookingsChartOptions.yaxis.labels.offsetX = -10;
    this.monthlyBookingsChartOptions.yaxis.title.offsetX = -70;
  }
}

function getMonthlyBookingsChartOptions(obj: any, dates: string[], counts: number[]) {
  return {
    series: [{
      name: 'Bookings',
      data: counts
    }],
    chart: {
      type: 'bar',
      height: '318',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: [obj.primary],
    fill: {
      opacity: .9
    },
    grid: {
      padding: {
        bottom: -4
      },
      borderColor: obj.gridBorder,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      type: 'datetime',
      categories: dates,
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
    },
    yaxis: {
      title: {
        text: 'Number of Bookings',
        style: {
          size: 9,
          color: obj.muted
        }
      },
      labels: {
        offsetX: 0,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 0
      },
    },
    stroke: {
      width: 0
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '10px',
        fontFamily: obj.fontFamily,
      },
      offsetY: -27
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 4,
        dataLabels: {
          position: 'top',
          orientation: 'vertical',
        }
      },
    }
  }
}