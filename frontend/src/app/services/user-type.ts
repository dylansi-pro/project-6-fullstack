import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserType } from '../common/user-type';

@Injectable({
  providedIn: 'root'
})
class UserTypeService {

  private baseUrl = 'http://localhost:8080/api/user-types';

  constructor(private httpClient: HttpClient) { }

  getUserTypes(): Observable<UserType[]> {
    return this.httpClient.get<UserType[]>(this.baseUrl);
  }

  getUserTypeById(id: number): Observable<UserType> {
    return this.httpClient.get<UserType>(`${this.baseUrl}/${id}`);
  }

  createUserType(userType: UserType): Observable<UserType> {
    return this.httpClient.post<UserType>(this.baseUrl, userType);
  }

  deleteUserType(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  updateUserType(userType: UserType): Observable<UserType> {
    return this.httpClient.put<UserType>(`${this.baseUrl}/${userType.id}`, userType);
  }
}

export { UserTypeService };
