import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { globals } from 'src/environments/environment';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  private _user: User;

  isLoggedUser: boolean = false;
  loggedUserFollows: boolean = false;
  waitFollow: boolean = false;

  @Input()
  set user(val: User) {
    this._user = val;
    this.isLoggedUser = false;
    this.loggedUserFollows = false;
    if (this.userService.isAuthenticated() && val != null) {
      if (globals.user.userId == val.userId) {
        this.isLoggedUser = true;
      }

      for (const follower of val.followers) {
        if (globals.user.userId == follower.followerId) {
          this.loggedUserFollows = true;
          break;
        }
      }
    }
  }

  get user() {
    return this._user;
  }

  constructor(
    private userService: UserService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  follow(event: any): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isLoggedUser) {
      this.navigation.navigate(['/profile'])
    }

    this.waitFollow = true;

    if (!this.loggedUserFollows) {
      this.userService.followUser(this.user.userId).subscribe({
        next: l => {
          this.userService.findById(this.user.userId).subscribe({
            next: u => {
              this.waitFollow = false;
              this.user.assign(u);
              this.loggedUserFollows = true;
            },
            error: err => {
              this.waitFollow = false;
              this.alertService.error("Error when trying to follow", err.error?.message);
            }
          })
        },
        error: err => {
          this.waitFollow = false;
          this.alertService.error("Error when trying to follow", err.error?.message);
        }
      });
    } else {
      this.userService.unfollowUser(this.user.userId).subscribe({
        next: l => {
          this.userService.findById(this.user.userId).subscribe({
            next: u => {
              this.waitFollow = false;
              this.user.assign(u);
              this.loggedUserFollows = false;
            },
            error: err => {
              this.waitFollow = false;
              this.alertService.error("Error when trying to follow", err.error?.message);
            }
          })
        },
        error: err => {
          this.waitFollow = false;
          this.alertService.error("Error when trying to unfollow", err.error?.message);
        }
      });
    }
  }
}
