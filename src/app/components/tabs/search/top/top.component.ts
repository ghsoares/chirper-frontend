import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { User } from 'src/app/models/user';
import { ChirpService } from 'src/app/services/chirp.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';

@Component({
  selector: 'tab-search-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  chirps: Chirp[] = [];
  users: User[] = [];

  private _query: string = "";

  @Input()
  public set query(val: string) {
    this._query = val;
    this.updateQuery();
  }
    
  public get query(): string {
    return this._query;
  }

  constructor(
    private userService: UserService,
    private chirpService: ChirpService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  updateQuery() {
    if (this.query == "") {
      this.chirps = [];
      this.users = [];
      return;
    }

    console.log(this.query);

    this.chirpService.searchByQuery(this.query).subscribe({
      next: chirps => {
        this.chirps = chirps;
      },
      error: err => {
        this.alertService.error("Error when trying to search", err.error?.message);
        console.error(err);
      }
    });

    this.userService.searchByQuery(this.query).subscribe({
      next: users => {
        this.users = users;
      },
      error: err => {
        this.alertService.error("Error when trying to search", err.error?.message);
        console.error(err);
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

  viewUser(userId: number): void {
    this.navigation.navigate(['/view-user'], {
      queryParams: {
        'user-id': userId
      }
    });
  }
}
