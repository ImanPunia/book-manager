import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bookResponse } from './Models/bookResponse';

@Injectable({
  providedIn: 'root',
})
export class httpConnectionService {
  constructor(private http: HttpClient) {}

  rootUrl = '/book';

  addSingleBook(file: FormData) : Observable<bookResponse>{
    return this.http.post<bookResponse>(this.rootUrl + '/addBook', file);
  }
}
