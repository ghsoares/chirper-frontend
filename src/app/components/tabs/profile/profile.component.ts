import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { globals } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = null;
  waitLoadUser: boolean = false;

  constructor(
    private userService: UserService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.navigation.navigate(['/login']);
      return;
    }

    this.waitLoadUser = true;
    this.userService.findById(globals.user.userId).subscribe({
      next: user => {
        this.waitLoadUser = false;
        this.user = user;
      },
      error: err => {
        this.alertService.error("Error when trying to view user", err.error?.message);
        console.error(err);
        this.navigation.navigate(['/home']);
      }
    });

    //this.user = globals.user;
  }

  viewChirp(chirpId: number): void {
    this.navigation.navigate(['view-chirp'], {
      queryParams: {
        'chirp-id': chirpId
      }
    })
  }

  edit(): void {
    this.navigation.navigate(['/profile-edit']);
  }

  logout(): void {
    this.navigation.navigate(['/logout']);
  }
}
