import { Component, OnInit } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';

@Component({
  selector: 'app-reply-chirp',
  templateUrl: './reply-chirp.component.html',
  styleUrls: ['./reply-chirp.component.scss']
})
export class ReplyChirpComponent implements OnInit {
  chirp: Chirp = null;
  body: string = "";
  waitLoadChirp: boolean = false;
  waitReply: boolean = false;

  constructor(
    private chirpService: ChirpService,
    private userService: UserService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.navigation.navigate(['/login']);
      return
    }

    this.waitLoadChirp = true;

    this.navigation.route.queryParams.subscribe({
      next: params => {
        let chirpId: number = params['chirp-id'];
        if (chirpId != undefined) {
          this.chirpService.findById(chirpId).subscribe({
            next: chirp => {
              this.waitLoadChirp = false;
              this.chirp = chirp;
            },
            error: err => {
              this.alertService.error("Error when trying to load chirp", err.error?.message);
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

  reply(): void {
    const chirp = new Chirp();
    chirp.replyOf = Chirp.fromId(this.chirp.chirpId);
    chirp.body = this.body;

    this.waitReply = true;

    this.chirpService.createChirp(chirp).subscribe({
      next: chirp => {
        this.waitReply = false;
        this.navigation.navigate(["/view-chirp"], {
          queryParams: { 'chirp-id': chirp.chirpId }
        });
      },
      error: err => {
        this.waitReply = false;
        this.alertService.error("Error when trying to reply", err.error?.message);
      }
    });
  }
}
