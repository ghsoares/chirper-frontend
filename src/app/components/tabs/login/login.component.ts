import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { LocalDate } from 'src/app/utils/local-date';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup = null;
  waitLogin: boolean = false;

  constructor(
    private navigation: NavigationService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  login(): void {
    if (this.waitLogin) return;

    const formValue = this.userForm.value;
    const user = new User();

    const username: string = formValue.username;
    const password: string = formValue.password;

    user.username = username;
    user.password = password;

    this.waitLogin = true;

    this.userService.loginUser(user).subscribe({
      next: user => {
        this.waitLogin = false;
        this.userService.setGlobalUser(user);
        this.userService.rememberUser(User.fromUsernamePassword(username, password));
        this.navigation.navigate(["/home"]);
      },
      error: err => {
        this.waitLogin = false;
        this.alertService.error("Error when trying to login", err.error?.message);
        console.error(err);
      }
    });
  }

}
