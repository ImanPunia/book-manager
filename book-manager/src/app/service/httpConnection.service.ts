import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { book } from '../Models/bookSaved';

@Injectable({
  providedIn: 'root',
})
export class httpConnectionService {
  constructor(private http: HttpClient) {}

  rootUrl = '/book';

  addSingleBook(file: FormData): Observable<book[]> {
    return this.http.post<book[]>(this.rootUrl + '/addBook', file);
  }

  fetchBooks(): Observable<book[]>{
    return this.http.get<book[]>(this.rootUrl + '/fetchBooks');
  }
}
