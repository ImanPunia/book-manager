import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { book } from '../Models/bookSaved';
import { bookResponse } from '../Models/bookResponse';

@Injectable({
  providedIn: 'root',
})
export class httpConnectionService {
  constructor(private http: HttpClient) {}

  rootUrl = '/book';

  addSingleBook(file: FormData): Observable<bookResponse> {
    return this.http.post<bookResponse>(this.rootUrl + '/addBook', file);
  }

  fetchBooks(): Observable<bookResponse>{
    return this.http.get<bookResponse>(this.rootUrl + '/fetchBooks');
  }

  deleteBook(id:String):Observable<bookResponse>{
    return this.http.delete<bookResponse>(this.rootUrl + '/deleteBook/' + id);
  }

  updateBook(data: FormData): Observable<bookResponse>{
    return this.http.put<bookResponse>(this.rootUrl + '/updateBook',  data);
  }
}
