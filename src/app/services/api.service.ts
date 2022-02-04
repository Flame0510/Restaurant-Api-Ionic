import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  me = () => this.http.get('https://api-stage.eatsready.com/v2/auth/me');

  signUp = (
    name: string,
    surname: string,
    email: string,
    password: string,
    os: string
  ) =>
    this.http.post('https://api-stage.eatsready.com/v2/auth/signup', {
      name,
      surname,
      email,
      password,
      os,
    });

  signIn = (email: string, password: string) =>
    this.http.post('https://api-stage.eatsready.com/v2/auth/login', {
      email,
      password,
    });

  refreshToken = (refreshToken: string) =>
    this.http.post('https://api-stage.eatsready.com/v2/auth/token', {
      grantType: 'refresh_token',
      refreshToken,
    });
}
