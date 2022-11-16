import { Component, OnInit } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { globals } from 'src/environments/environment';

@Component({
  selector: 'app-edit-chirp',
  templateUrl: './edit-chirp.component.html',
  styleUrls: ['./edit-chirp.component.scss']
})
export class EditChirpComponent implements OnInit {

  body: string = "";
  waitLoadChirp: boolean = false;
  waitSave: boolean = false;

  constructor(
    private userService: UserService,
    private chirpService: ChirpService,
    private navigation: NavigationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.navigation.navigate(['/login']);
      return;
    }

    this.waitLoadChirp = true;

    this.navigation.route.queryParams.subscribe({
      next: params => {
        let chirpId: number = params['chirp-id'];
        if (chirpId != undefined) {
          this.chirpService.findById(chirpId).subscribe({
            next: chirp => {
              if (globals.user.userId != chirp.author?.userId) {
                this.alertService.error("Error when trying to load chirp", "You are trying to edit a chirp that isn't yours");
                return;
              }

              this.waitLoadChirp = false;
              this.body = chirp.body;
            },
            error: err => {
              this.alertService.error("Error when trying to load chirp", err.error?.message);
              console.error(err);
              this.navigation.navigate(['/home']);
            }
          });
        }
      }
    })
  }

  save(): void {
    if (this.waitSave) return;

    /*
    const formValue = this.userForm.value;
    const user = new User();

    user.username = formValue.username;
    user.password = formValue.password;

    this.waitLogin = true;
    */
    
    const chirp = new Chirp();
    chirp.body = this.body;

    this.waitSave = true;

    this.chirpService.createChirp(chirp).subscribe({
      next: chirp => {
        this.waitSave = false;
        this.navigation.navigate(["/view-chirp"], {
          queryParams: { 'chirp-id': chirp.chirpId }
        });
      },
      error: err => {
        this.waitSave = false;
        this.alertService.error("Error when trying to create chirp", err.error?.message);
        console.error(err);
      }
    });
  }

  goBack(): void {
    this.navigation.back();
  }

}
