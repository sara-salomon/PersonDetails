import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from './user'
@Injectable({
  providedIn: 'root'
})
export class UserFunctionService {
  currentUser: string;
  currentUserFirstName: string;
  currentUserLastName: string;
  currentUserbornDate: Date;
  currentUserid: string;
  currentUsergender: number;
  currentUserhMO: string;
  private userUrl = 'https://localhost:44348/api/PersonsDetails';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('addHero'))
    );
  }

}
