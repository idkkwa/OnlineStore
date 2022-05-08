import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'models/login.model';

const baseUrl = 'http://localhost:3000/api/v2/users'

const loginURL = 'http://localhost:3000/api/v2/login'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
  return this.http.post(baseUrl, data);
  }

  getAll(): Observable<Login[]> {
    return this.http.get<Login[]>(baseUrl);
  }

  check(data: any): Observable<any> {
    return this.http.post(loginURL, data);

  }


}