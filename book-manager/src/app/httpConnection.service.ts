import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './Models/Book';

@Injectable({
  providedIn: 'root'
})

export class httpConnectionService {

  constructor(private http: HttpClient) { }

  rootUrl = '/book';

  addSingleBook(file:FormData, value:Book){
    return this.http.post(this.rootUrl + '/addBook', file);
  }
}
