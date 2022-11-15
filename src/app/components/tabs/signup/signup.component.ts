import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import CustomValidators from 'src/app/form-validators/CustomValidators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
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
    private router: Router,
    private userService: UserService
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

    user.profileName = formValue.profileName;
    user.username = formValue.username;
    user.email = formValue.email;
    user.birthDate = LocalDate.fromString(formValue.birthDate);
    user.password = formValue.password;

    this.waitSignup = true;

    this.userService.registerUser(user).subscribe({
      next: user => {
        this.waitSignup = false;
        this.userService.authUser(user);
        this.router.navigate(["/home"]);
      },
      error: err => {
        this.waitSignup = false;
        console.error(err);
      }
    });
  }
}
