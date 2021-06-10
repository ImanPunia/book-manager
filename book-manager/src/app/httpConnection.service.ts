import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class httpConnectionService {

  constructor(private http: HttpClient) { }

  rootUrl = '/book';

  printHelloWorld(){
    return this.http.get(this.rootUrl + '/hello-world');
  }
}
