import { Component, Input, OnInit } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';

@Component({
  selector: 'tab-search-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

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
    private userService: UserService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  updateQuery() {
    if (this.query == "") {
      this.users = [];
      return;
    }

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

  viewUser(userId: number): void {
    this.navigation.navigate(['/view-user'], { queryParams: { 'user-id': userId } });
  }
}
