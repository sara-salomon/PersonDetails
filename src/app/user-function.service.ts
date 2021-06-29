import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import {User} from './user'
@Injectable({
  providedIn: 'root'
})
export class UserFunctionService {

  private userUrl = 'https://localhost:44348/api/PersonsDetails';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      // this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  // addUser(user:User):Observable<any>
  // {
  //   alert("gyhj")
  //   return this.http.post(this.userUrl, user,this.httpOptions)
  // }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
      // tap((newUser: User) => this.log(`added hero w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addHero'))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      catchError(this.handleError<User[]>('getHeroes', []))
    );
  }
  // addHero(user: User): Observable<User> {
  //   return this.http.post<User>(this.userUrl, user, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addHero', user))
  //     );
  // }
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.userUrl);
  // }
  
}
