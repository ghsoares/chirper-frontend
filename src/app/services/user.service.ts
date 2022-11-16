import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map, Observable, of } from 'rxjs';
import { environment, globals } from 'src/environments/environment';
import { User } from '../models/user';
import { UserFollower } from '../models/user-follower';

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

  public findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiPath}/user/find?id=${encodeURIComponent(id)}`).pipe(
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

    return this.http.patch<User>(`${this.apiPath}/user/update`, user, options).pipe(
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

    return this.http.put<User>(`${this.apiPath}/user/update-password?new-password=${encodeURIComponent(newPassword)}`, null, options).pipe(
      map(res => new User(res))
    );
  }

  public followUser(userId: number): Observable<UserFollower> {
    let options = {};

    if (this.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.put<UserFollower>(`${this.apiPath}/user/follow?user-id=${encodeURIComponent(userId)}`, null, options).pipe(
      map(res => {
        console.log(res);
        return new UserFollower(res);
      })
    );
  }

  public unfollowUser(userId: number): Observable<UserFollower> {
    let options = {};

    if (this.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.put<UserFollower>(`${this.apiPath}/user/unfollow?user-id=${encodeURIComponent(userId)}`, null, options).pipe(
      map(res => {
        console.log(res);
        return new UserFollower(res);
      })
    );
  }

  public searchByQuery(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiPath}/user/search?query=${encodeURIComponent(query)}`).pipe(
      map(res => res.map(v => new User(v)))
    );
  }

  public setGlobalUser(user: User): void {
    globals.user = user;
  }

  public rememberUser(user: User): void {
    localStorage.setItem("__REMEMBER_USER", JSON.stringify({
      username: user.username,
      password: user.password
    }));
  }

  public loadRememberedUser(): User {
    const userString: string = localStorage.getItem("__REMEMBER_USER");
    if (userString != null) {
      return new User(JSON.parse(userString));
    }
    return null;
  }

  public forgetUser(): void {
    localStorage.removeItem("__REMEMBER_USER");
  }

  public isAuthenticated(): boolean {
    return globals.user != null;
  }
}
