import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import CustomValidators from 'src/app/form-validators/CustomValidators';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { LocalDate } from 'src/app/utils/local-date';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup = null;
  waitSignup: boolean = false;

  constructor(
    private navigation: NavigationService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      profileName: new FormControl('', [
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      birthDate: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        CustomValidators.matchesControl('password')
      ]),
    })
  }

  signup(): void {
    if (this.waitSignup) return;

    const formValue = this.userForm.value;
    const user = new User();

    const username: string = formValue.username;
    const password: string = formValue.password;

    user.profileName = formValue.profileName;
    user.username = username;
    user.email = formValue.email;
    user.birthDate = formValue.birthDate;
    user.password = password;

    this.waitSignup = true;

    this.userService.registerUser(user).subscribe({
      next: user => {
        const loginUser = new User();
        loginUser.username = username;
        loginUser.password = password;
        this.userService.loginUser(loginUser).subscribe({
          next: user => {
            this.waitSignup = false;
            this.userService.setGlobalUser(user);
            this.userService.rememberUser(User.fromUsernamePassword(username, password));
            this.navigation.navigate(["/profile"]);
          },
          error: err => {
            this.waitSignup = false;
            this.alertService.error("Error when trying to login", err.error?.message);
            this.navigation.navigate(['/login'])
          }
        });
      },
      error: err => {
        this.waitSignup = false;
        this.alertService.error("Error when trying to signup", err.error?.message);
      }
    });
  }
}
