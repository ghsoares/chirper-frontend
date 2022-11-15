import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    return this.http.post<User>(`${this.apiPath}/user/register`, user).pipe(
      map(res => new User(res))
    );
  }

  public loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiPath}/user/login`, user).pipe(
      map(res => new User(res))
    );
  }

  public updateUser(user: User): Observable<User> {
    let options = {};

    if (this.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.put<User>(`${this.apiPath}/user/update`, user, options).pipe(
      map(res => new User(res))
    );
  }

  public updateUserPassword(newPassword: string): Observable<User> {
    let options = {};

    if (this.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.put<User>(`${this.apiPath}/user/update-password?new-password=${newPassword}`, null, options).pipe(
      map(res => new User(res))
    );
  }

  public searchByQuery(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiPath}/user/search?query=${query}`).pipe(
      map(res => res.map(v => new User(v)))
    );
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
