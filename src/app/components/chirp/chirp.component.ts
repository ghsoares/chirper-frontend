import { Component, Input, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { LocalDateTime } from 'src/app/utils/local-date';
import { globals } from 'src/environments/environment';

@Component({
  selector: 'chirp',
  templateUrl: './chirp.component.html',
  styleUrls: ['./chirp.component.scss'],
})
export class ChirpComponent implements OnInit, OnDestroy {
  private _chirp: Chirp;

  loggedUserLiked: boolean = false;
  loggedUserChirp: boolean = false;
  waitLike: boolean = false;
  elapsedDisplay: string = "";
  updateInterval: NodeJS.Timeout = null;

  @Input()
  showAsReply: boolean = false;

  @Input()
  set chirp(val: Chirp) {
    this._chirp = val;
    this.loggedUserLiked = false;
    this.loggedUserChirp = false;
    if (val != null) {
      if (this.userService.isAuthenticated()) {
        let userId: number = globals.user.userId;
        this.loggedUserChirp = val.author?.userId == userId;
        for (const like of val.likes) {
          if (like.userId == userId) {
            this.loggedUserLiked = true;
            break;
          }
        }
      }
    }
    this.updateElapsedTime();
  }

  get chirp() {
    return this._chirp;
  }

  constructor(
    private userService: UserService,
    private chirpService: ChirpService,
    private navigationService: NavigationService,
    private alertService: AlertService
  ) { 
    
  }

  ngOnInit(): void {
    this.updateInterval = setInterval(() => { 
      this.updateElapsedTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.updateInterval)
      clearInterval(this.updateInterval);
  }

  likeChirp(event: any): void {
    if (!this.userService.isAuthenticated()) return;
    event.preventDefault();
    event.stopPropagation();
    this.waitLike = true;

    if (!this.loggedUserLiked) {
      this.chirpService.likeChirp(this.chirp.chirpId).subscribe({
        next: l => {
          this.chirpService.findById(this.chirp.chirpId).subscribe({
            next: c => {
              this.waitLike = false;
              this.chirp.assign(c);
              this.loggedUserLiked = true;
            },
            error: err => {
              this.alertService.error("Error when trying to like", err.error?.message);
              this.waitLike = false;
            }
          })
        },
        error: err => {
          this.alertService.error("Error when trying to like", err.error?.message);
          console.error(err);
          this.waitLike = false;
        }
      });
    } else {
      this.chirpService.unlikeChirp(this.chirp.chirpId).subscribe({
        next: l => {
          this.chirpService.findById(this.chirp.chirpId).subscribe({
            next: c => {
              this.waitLike = false;
              this.chirp.assign(c);
              this.loggedUserLiked = false;
            },
            error: err => {
              this.alertService.error("Error when trying to unlike", err.error?.message);
              console.error(err);
              this.waitLike = false;
            }
          })
        },
        error: err => {
          this.alertService.error("Error when trying to unlike", err.error?.message);
          console.error(err);
          this.waitLike = false;
        }
      });
    }
  }

  replyChirp(event: any): void {
    if (!this.userService.isAuthenticated()) return;
    event.preventDefault();
    event.stopPropagation();

    this.navigationService.navigate(['/reply-chirp'], {
      queryParams: {
        'chirp-id': this.chirp.chirpId
      }
    })
  }

  editChirp(event: any): void {
    if (!this.userService.isAuthenticated()) return;
    event.preventDefault();
    event.stopPropagation();

    this.navigationService.navigate(['/edit-chirp'], {
      queryParams: {
        'chirp-id': this.chirp.chirpId
      }
    })
  }

  viewReply(event: any): void {
    if (this.chirp?.replyOf == undefined || this.chirp?.replyOf == null) return;

    event.preventDefault();
    event.stopPropagation();

    this.navigationService.navigate(['/view-chirp'], {
      queryParams: {
        'chirp-id': this.chirp.replyOf.chirpId
      }
    })
  }

  viewUser(event: any): void {
    event.preventDefault();
    event.stopPropagation();

    this.navigationService.navigate(['/view-user'], {
      queryParams: {
        'user-id': this.chirp.author.userId
      }
    })
  }

  updateElapsedTime(): void {
    if (this._chirp == null) {
      this.elapsedDisplay = "";
      return;
    }

    let now = Date.now();

    let diff = now - new Date(this._chirp.creationDate).getTime();

    diff /= 1000;

    let seconds = Math.round(diff);

    diff = Math.floor(diff / 60);

    let minutes = Math.round(diff);

    diff = Math.floor(diff / 60);

    let hours = Math.round(diff);

    diff = Math.floor(diff / 24);

    let days = diff;

    let display: string = `${seconds}s`;

    if (minutes > 0) {
      display = `${minutes}m`;
    }
    if (hours > 0) {
      display = `${hours}h`;
    }
    if (days > 0) {
      display = `${days}d`;
      if (days > 30) {
        display = `+30d`;
      }
    }

    this.elapsedDisplay = display;
  }
}
