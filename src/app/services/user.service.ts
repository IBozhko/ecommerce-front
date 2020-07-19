import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:8080/api/users';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<GetResponseUsers>(this.url).pipe(map(response => response._embedded.users));
  }

  public saveUser(user: User): Observable<User>{
     return this.httpClient.post<User>(this.url, user,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public updateUser(user: User): Observable<void>{
    localStorage.setItem('currentUser', JSON.stringify(user));
    return this.httpClient.put<void>(`${this.url}/${user.id}`, user,{
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   });
 }

 public addToFavorites(id: number): Observable<void>{
  let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
  let repeats: boolean = false;
  if (currentUser.favorites == undefined){
    currentUser.favorites = `${id}`;
  }
  else {
    let favoritesArray = currentUser.favorites.split(',');
    for (let currentFavorite of favoritesArray){
      if (currentFavorite == `${id}`){
          repeats = true;
          break;
      }
    }
    if (!repeats){
      currentUser.favorites = `${currentUser.favorites},${id}`;
    }
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  return this.httpClient.put<void>(`${this.url}/${currentUser.id}`, currentUser,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
 }

 public removeFromFavorites(id: number):Observable<void>{
  let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
  let favoritesArray = currentUser.favorites.split(',');
  if (currentUser.favorites == undefined) {
    currentUser.favorites = `${id}`;
  }
  else {
    for (let currentFavorite of favoritesArray) {
      if (currentFavorite == `${id}`) {
        favoritesArray.splice(favoritesArray.indexOf(currentFavorite), 1);
        break;
      }
    }
  }
  currentUser.favorites = undefined;
  for (let newFavorite of favoritesArray){
    if (currentUser.favorites == undefined){
      currentUser.favorites = `${newFavorite}`;
    }
    else{
      currentUser.favorites = `${currentUser.favorites},${newFavorite}`;
    }
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  return this.httpClient.put<void>(`${this.url}/${currentUser.id}`, currentUser,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
 }
}

interface GetResponseUsers{
  _embedded: {
    users: User[];
  }
}
