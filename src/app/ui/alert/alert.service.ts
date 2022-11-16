import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Alert } from './alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new BehaviorSubject<Alert>(null);

  onAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  success(title: string, message: string, options?: Partial<Alert>) {
    this.alert(new Alert({ ...options, alertType: "success", title, message }));
  }

  error(title: string, message: string, options?: Partial<Alert>) {
    this.alert(new Alert({ ...options, alertType: "error", title, message }));
  }

  info(title: string, message: string, options?: Partial<Alert>) {
    this.alert(new Alert({ ...options, alertType: "info", title, message }));
  }

  warning(title: string, message: string, options?: Partial<Alert>) {
    this.alert(new Alert({ ...options, alertType: "warning", title, message }));
  }

  alert(alert: Alert) {
    this.subject.next(alert);
  }

  clear() {
    this.subject.next(new Alert());
  }
}
