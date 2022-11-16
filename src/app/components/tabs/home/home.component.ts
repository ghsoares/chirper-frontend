import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';

@Component({
  selector: 'tab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {'class': 'tab'}
})
export class HomeComponent implements OnInit {

  chirps: Chirp[];

  constructor(
    public userService: UserService,
    private chirpService: ChirpService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.chirps = [];

    this.chirpService.listNotReply().subscribe({
      next: chirps => {
        this.chirps = chirps;
      },
      error: err => {
        this.alertService.error("Error when trying to get chirps", err.error?.message);
      }
    });
  }

  createChirp() {
    this.navigation.navigate(['/new-chirp']);
  }

  viewChirp(chirpId: number): void {
    this.navigation.navigate(['view-chirp'], {
      queryParams: {
        'chirp-id': chirpId
      }
    })
  }
}
