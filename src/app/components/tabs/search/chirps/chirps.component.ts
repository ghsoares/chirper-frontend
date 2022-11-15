import { Component, Input, OnInit } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';

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
    private chirpService: ChirpService
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
        console.error(err);
      }
    });
  }

}
