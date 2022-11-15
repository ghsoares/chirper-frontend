import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  private _user: User;

  @Input()
  set user(val: User) {
    this._user = val;
  }

  get user() {
    return this._user;
  }

  constructor() { }

}
