import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ✅ Make sure this is imported
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private baseUrl = 'https://localhost:7063/api/Admin';
  getUsers: any;

  constructor(private http: HttpClient) {} // ✅ This must be exactly like this

  login(admin: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/AdminLogin`, admin);
  }

  register(admin: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/AdminReg`, admin);
  }
}
