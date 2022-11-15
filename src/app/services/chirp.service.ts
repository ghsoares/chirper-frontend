import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  public listAll(): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`${this.apiPath}/chirp/list`).pipe(
      map(res => res.map(v => new Chirp(v)))
    );
  }

  public listNotReply(): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`${this.apiPath}/chirp/not-reply`).pipe(
      map(res => res.map(v => new Chirp(v)))
    );
  }

  public listRange(start: number, count: number): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`${this.apiPath}/chirp/list?start=${start}&count=${count}`).pipe(
      map(res => res.map(v => new Chirp(v)))
    );
  }

  public listByAuthorUsername(username: string): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`${this.apiPath}/chirp/list?username=${username}`).pipe(
      map(res => res.map(v => new Chirp(v)))
    );
  }

  public findById(id: number): Observable<Chirp> {
    return this.http.get<Chirp>(`${this.apiPath}/chirp/find?id=${id}`).pipe(
      map(res => new Chirp(res))
    );
  }

  public searchByQuery(query: string): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`${this.apiPath}/chirp/search?query=${query}`).pipe(
      map(res => res.map(v => new Chirp(v)))
    );
  }

  public createChirp(chirp: Chirp): Observable<Chirp> {
    let options = {};

    if (this.userService.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.post<Chirp>(`${this.apiPath}/chirp/create`, chirp, options).pipe(
      map(res => new Chirp(res))
    );
  }

  public updateChirp(chirp: Chirp): Observable<Chirp> {
    let options = {};

    if (this.userService.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.put<Chirp>(`${this.apiPath}/chirp/update`, chirp, options).pipe(
      map(res => new Chirp(res))
    );
  }

  public deleteById(id: number): Observable<Chirp> {
    let options = {};

    if (this.userService.isAuthenticated()) {
      options = {
        headers: new HttpHeaders()
          .set("Authorization", globals.user.token)
      }
    }

    return this.http.delete<Chirp>(`${this.apiPath}/chirp/delete/id/${id}`, options).pipe(
      map(res => new Chirp(res))
    );
  }
}
