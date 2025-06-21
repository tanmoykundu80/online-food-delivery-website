// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7063/api/User';
  getAllUsers: any;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/UserReg`, user, { responseType: 'text' });
  }

  login(user: User): Observable<any> {
    // ✅ Send user as JSON body, not as query params
    return this.http.post(`${this.baseUrl}/UserLogin`, user, { responseType: 'text' });
  }
}
