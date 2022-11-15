import { Component, Input, OnInit } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService
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
        console.error(err);
      }
    });
  }

}
