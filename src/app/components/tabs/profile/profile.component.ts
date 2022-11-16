import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { globals } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = null;

  constructor(
    private userService: UserService,
    private navigation: NavigationService
  ) { }

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.navigation.navigate(['/login']);
      return;
    }

    this.user = globals.user;
  }

  edit(): void {
    this.navigation.navigate(['/profile-edit']);
  }

  logout(): void {
    this.navigation.navigate(['/logout']);
  }
}
