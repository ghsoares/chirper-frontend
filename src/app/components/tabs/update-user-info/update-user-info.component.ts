import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CustomValidators from 'src/app/form-validators/CustomValidators';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { LocalDate } from 'src/app/utils/local-date';
import { globals } from 'src/environments/environment';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.scss']
})
export class UpdateUserInfoComponent implements OnInit {

  userForm: FormGroup = null;
  waitSave: boolean = false;

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

    const user: User = globals.user;

    this.userForm = new FormGroup({
      profileName: new FormControl(user.profileName, [
        Validators.required
      ]),
      username: new FormControl(user.username, [
        Validators.required
      ]),
      email: new FormControl(user.email, [
        Validators.required
      ]),
      bio: new FormControl(user.bio, [
        Validators.required
      ]),
      birthDate: new FormControl(user.birthDate.toString(), [
        Validators.required
      ]),
    })
  }

  save(): void {
    if (this.waitSave) return;

    const formValue = this.userForm.value;
    const user = new User();

    let password = this.userService.loadRememberedUser().password;

    user.profileName = formValue.profileName;
    user.username = formValue.username;
    user.email = formValue.email;
    user.bio = formValue.bio;
    user.birthDate = formValue.birthDate;

    this.waitSave = true;

    this.userService.updateUser(user).subscribe({
      next: user => {
        const loginUser = new User();
        loginUser.username = formValue.username;
        loginUser.password = password;
        this.userService.loginUser(loginUser).subscribe({
          next: user => {
            this.waitSave = false;
            this.userService.setGlobalUser(user);
            this.userService.rememberUser(User.fromUsernamePassword(loginUser.username, password));
            this.navigation.navigate(["/profile"]);
          },
          error: err => {
            this.waitSave = false;
            this.alertService.error("Error when trying to update profile", err.error?.message);
            console.error(err);
          }
        })
      },
      error: err => {
        this.waitSave = false;
        this.alertService.error("Error when trying to update profile", err.error?.message);
        console.error(err);
      }
    });
  }
  
  changePassword(): void {
    this.navigation.navigate(['/profile-edit-password'])
  }

  goBack(): void {
    this.navigation.back();
  }
}
