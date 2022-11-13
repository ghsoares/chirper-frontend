import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, globals } from 'src/environments/environment';
import { Chirp } from '../models/chirp';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChirpService {
  private apiPath: string;

  constructor(private userService: UserService, private http: HttpClient) { 
    this.apiPath = environment.apiPath;
  }

  public getAll(): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`${this.apiPath}/chirp/all`);
  }

  public getRange(start: number, count: number): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`${this.apiPath}/chirp/range?start=${start}&count=${count}`);
  }

  public getPage(page: number, count: number): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`${this.apiPath}/chirp/page?start=${page}&count=${count}`);
  }

  public getById(id: number): Observable<Chirp> {
    return this.http.get<Chirp>(`${this.apiPath}/chirp/id/${id}`);
  }

  public getAllByUser(username: string): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`${this.apiPath}/chirp/by-user/${username}`);
  }

  public createChirp(chirp: Chirp): Observable<Chirp> {
    let options = {};

    if (this.userService.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.post<Chirp>(`${this.apiPath}/chirp/create`, chirp, options);
  }

  public updateChirp(chirp: Chirp): Observable<Chirp> {
    let options = {};

    if (this.userService.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.put<Chirp>(`${this.apiPath}/chirp/update`, chirp, options);
  }

  public deleteById(id: number): Observable<Chirp> {
    let options = {};

    if (this.userService.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.delete<Chirp>(`${this.apiPath}/chirp/delete/id/${id}`, options);
  }
}
