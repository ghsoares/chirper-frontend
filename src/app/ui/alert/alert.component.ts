import { Component, OnInit } from '@angular/core';
import { Alert } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];

  constructor(
    private alertService: AlertService
  ) {
    this.alertService.onAlert().subscribe({
      next: alert => {
        if (alert == null) return;
        this.alerts.push(alert);
        // if (alert.autoClose) {
        setTimeout(() => this.removeAlert(alert), alert.autoCloseSecs * 1000);
        // }
      }
    });
  }

  ngOnInit(): void {
    
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }
}
