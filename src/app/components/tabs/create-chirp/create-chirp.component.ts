import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';

@Component({
  selector: 'app-create-chirp',
  templateUrl: './create-chirp.component.html',
  styleUrls: ['./create-chirp.component.scss']
})
export class CreateChirpComponent implements OnInit {

  body: string = "";
  waitCreate: boolean = false;

  constructor(
    private userService: UserService,
    private chirpService: ChirpService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.navigation.navigate(['/login']);
    }
  }

  chirp(): void {
    if (this.waitCreate) return;

    /*
    const formValue = this.userForm.value;
    const user = new User();

    user.username = formValue.username;
    user.password = formValue.password;

    this.waitLogin = true;
    */
    
    const chirp = new Chirp();
    chirp.body = this.body;

    this.waitCreate = true;

    this.chirpService.createChirp(chirp).subscribe({
      next: chirp => {
        this.waitCreate = false;
        this.navigation.navigate(["/view-chirp"], {
          queryParams: { 'chirp-id': chirp.chirpId }
        });
      },
      error: err => {
        this.waitCreate = false;
        this.alertService.error("Error when trying to create chirp", err.error?.message);
      }
    });
  }

  goBack(): void {
    this.navigation.back();
  }
}
