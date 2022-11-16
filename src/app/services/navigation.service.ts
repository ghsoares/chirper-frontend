import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = [];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public location: Location
  ) {
    this.router.events.subscribe({
      next: ev => {
        if (ev instanceof NavigationEnd) {
          this.history.push(ev.urlAfterRedirects);
        }
      }
    })
  }

  navigate(commands: any[], extras?: NavigationExtras): void {
    this.router.navigate(commands, extras);
  }

  getParam<T>(name: string): T {
    return this.route.snapshot.queryParams[name];
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
