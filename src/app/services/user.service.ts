import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, globals } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiPath: string;

  constructor(private http: HttpClient) { 
    this.apiPath = environment.apiPath;
  }

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiPath}/user/register`, user);
  }

  public loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiPath}/user/login`, user);
  }

  public updateUser(user: User): Observable<User> {
    let options = {};

    if (this.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.put<User>(`${this.apiPath}/user/update`, user, options);
  }

  public authUser(user: User): void {
    globals.user = user;
  }

  public logoutUser(): void {
    globals.user = null;
  }

  public isAuthenticated(): boolean {
    return globals.user != null;
  }
}
