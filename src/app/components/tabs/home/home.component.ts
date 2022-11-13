import { Component, OnInit } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';

@Component({
  selector: 'tab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {'class': 'tab'}
})
export class HomeComponent implements OnInit {

  chirps: Chirp[];

  constructor(private chirpService: ChirpService) { }

  ngOnInit(): void {
    this.chirps = [];

    this.chirpService.getAll().subscribe({
      next: chirps => {
        this.chirps = chirps;
      },
      error: err => {
        console.error(err);
      }
    });
  }

}
