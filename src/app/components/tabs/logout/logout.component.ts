import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userService: UserService,
    private navigation: NavigationService
  ) { }

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.navigation.navigate(['/home']);
    }
  }

  goBack(): void {
    this.navigation.back();
  }

  logout(): void {
    this.userService.setGlobalUser(null);
    this.userService.forgetUser();
    this.navigation.navigate(["/home"]);
  }
}
