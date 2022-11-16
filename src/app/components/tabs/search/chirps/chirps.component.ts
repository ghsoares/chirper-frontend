import { Component, Input, OnInit } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { AlertService } from 'src/app/ui/alert/alert.service';

@Component({
  selector: 'tab-search-chirps',
  templateUrl: './chirps.component.html',
  styleUrls: ['./chirps.component.scss']
})
export class ChirpsComponent implements OnInit {

  chirps: Chirp[] = [];

  private _query: string;

  @Input()
  public set query(val: string) {
    this._query = val;
    this.updateQuery();
  }
    
  public get query(): string {
    return this._query;
  }

  constructor(
    private chirpService: ChirpService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  updateQuery() {
    if (this.query == "") {
      this.chirps = [];
      return;
    }

    this.chirpService.searchByQuery(this.query).subscribe({
      next: chirps => {
        this.chirps = chirps;
      },
      error: err => {
        this.alertService.error("Error when trying to search", err.error?.message);
      }
    });
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
