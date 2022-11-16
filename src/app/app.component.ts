import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Chirp } from './models/chirp';
import { NavigationService } from './services/navigation.service';
import { UserService } from './services/user.service';
import { AlertService } from './ui/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Chirper';
  currentRoute: string = '';
  waitAutoLogin: boolean = false;

  constructor(
    public userService: UserService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { 
    navigation.router.events.subscribe({
      next: e => {
        if (e instanceof NavigationEnd) {
          this.currentRoute = e.urlAfterRedirects;
        }
      }
    })
  }

  ngOnInit(): void {
    const u = this.userService.loadRememberedUser();
    if (u != null) {
      this.waitAutoLogin = true;
      //.pipe(delay(1000))
      this.userService.loginUser(u).subscribe({
        next: user => {
          this.waitAutoLogin = false;
          this.userService.setGlobalUser(user);
        },
        error: err => {
          this.waitAutoLogin = false;
          console.error(err);
          this.alertService.error("Error when loading login", err.error?.message);
          this.navigation.navigate(['/login']);
        }
      })
    }
  }
  
  navigateTo(...commands: any[]) {
    this.navigation.navigate(commands);
    //this.currentRoute = this.navigation.router.url;
  }
}
