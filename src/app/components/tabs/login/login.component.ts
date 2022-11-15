import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
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
    private router: Router,
    private userService: UserService
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

    user.username = formValue.username;
    user.password = formValue.password;

    this.waitLogin = true;

    this.userService.loginUser(user).subscribe({
      next: user => {
        console.log(user.birthDate.getFullYear());
        this.waitLogin = false;
        this.userService.authUser(user);
        this.router.navigate(["/home"]);
      },
      error: err => {
        this.waitLogin = false;
        console.error(err);
      }
    });
  }

}
