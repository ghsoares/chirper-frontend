import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chirp } from 'src/app/models/chirp';
import { ChirpService } from 'src/app/services/chirp.service';
import { UserService } from 'src/app/services/user.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/login']);
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
        this.router.navigate(["/view-chirp"], {
          queryParams: { chirpId: chirp.chirpId }
        });
      },
      error: err => {
        this.waitCreate = false;
        console.error(err);
      }
    })
  }
}
