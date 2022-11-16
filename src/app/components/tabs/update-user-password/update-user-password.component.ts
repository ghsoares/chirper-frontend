import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CustomValidators from 'src/app/form-validators/CustomValidators';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';

@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.scss']
})
export class UpdateUserPasswordComponent implements OnInit {

  userForm: FormGroup = null;
  waitChange: boolean = false;

  constructor(
    private navigation: NavigationService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.navigation.navigate(['/login']);
      return;
    }

    this.userForm = new FormGroup({
      password: new FormControl('', [
        Validators.required
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        CustomValidators.matchesControl('password')
      ]),
    })
  }

  save(): void {
    if (this.waitChange) return;

    const formValue = this.userForm.value;

    const newPassword: string = formValue.password;

    this.waitChange = true;

    this.userService.updateUserPassword(newPassword).subscribe({
      next: user => {
        const loginUser = new User();
        loginUser.username = user.username;
        loginUser.password = newPassword;
        this.userService.loginUser(loginUser).subscribe({
          next: user => {
            this.waitChange = false;
            this.userService.setGlobalUser(user);
            this.userService.rememberUser(User.fromUsernamePassword(user.username, newPassword));
            this.navigation.navigate(["/profile"]);
          },
          error: err => {
            this.waitChange = false;
            this.alertService.error("Error when trying to update password", err.error?.message);
          }
        });
      },
      error: err => {
        this.waitChange = false;
        this.alertService.error("Error when trying to update password", err.error?.message);
      }
    });
  }

}
