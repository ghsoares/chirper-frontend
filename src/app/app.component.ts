import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Chirp } from './models/chirp';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chirper';
  currentRoute: string = '';

  constructor(
    public userService: UserService,
    private router: Router
  ) { 
    router.events.subscribe({
      next: e => {
        if (e instanceof NavigationEnd) {
          this.currentRoute = e.urlAfterRedirects;
        }
      }
    })
  }
  
  navigateTo(...commands: any[]) {
    this.router.navigate(commands);
    this.currentRoute = this.router.url;
  }
}
