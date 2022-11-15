import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';
import { UserService } from 'src/app/services/user.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chirps = [];

    this.chirpService.listNotReply().subscribe({
      next: chirps => {
        this.chirps = chirps;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  createChirp() {
    this.router.navigate(['/new-chirp']);
  }
}
