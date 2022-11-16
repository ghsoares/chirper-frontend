import { Component, OnInit } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { globals } from 'src/environments/environment';

@Component({
  selector: 'app-view-chirp',
  templateUrl: './view-chirp.component.html',
  styleUrls: ['./view-chirp.component.scss']
})
export class ViewChirpComponent implements OnInit {

  chirp: Chirp = null;
  loggedUserLiked: boolean = false;
  waitLoadChirp: boolean = false;

  constructor(
    private chirpService: ChirpService,
    private userService: UserService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.waitLoadChirp = true;

    this.navigation.route.queryParams.subscribe({
      next: params => {
        let chirpId: number = params['chirp-id'];
        if (chirpId != undefined) {
          this.chirpService.findById(chirpId).subscribe({
            next: chirp => {
              this.waitLoadChirp = false;
              this.chirp = chirp;
              if (this.userService.isAuthenticated()) {
                let userId: number = globals.user.userId;
                for (const like of chirp.likes) {
                  if (like.userId == userId) {
                    this.loggedUserLiked = true;
                    break;
                  }
                }
              }
            },
            error: err => {
              this.alertService.error("Error when trying to load chirp", err.error?.message);
              console.error(err);
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

  viewChirp(chirpId: number): void {
    console.log(chirpId);
    this.navigation.navigate(['view-chirp'], {
      queryParams: {
        'chirp-id': chirpId
      }
    })
  }
}
