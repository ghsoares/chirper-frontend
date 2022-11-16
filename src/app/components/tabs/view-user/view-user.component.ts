import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { globals } from 'src/environments/environment';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  user: User = null;
  loggedUserFollows: boolean = false;
  waitLoadUser: boolean = false;
  waitFollow: boolean = false;

  constructor(
    private userService: UserService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.waitLoadUser = true;
    this.navigation.route.queryParams.subscribe({
      next: params => {
        let userId: number = params['user-id'];
        if (userId != undefined) {
          this.userService.findById(userId).subscribe({
            next: user => {
              this.waitLoadUser = false;
              this.user = user;
              if (this.userService.isAuthenticated()) {
                for (const follower of user.followers) {
                  if (globals.user.userId == follower.followerId) {
                    this.loggedUserFollows = true;
                    break;
                  }
                }
              }
            },
            error: err => {
              this.alertService.error("Error when trying to view user", err.error?.message);
              this.navigation.navigate(['/home']);
            }
          });
        }
      }
    })
  }

  goBack(): void {
    this.navigation.back();
  }

  logout(): void {
    this.navigation.navigate(['/logout']);
  }

  follow(): void {
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
