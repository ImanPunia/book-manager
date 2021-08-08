import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterCommunicationService {

  headerTypes: string[] = ['Books', 'Favourite'];
  navTypes: navTypes[] = [{'id':'1','name':'Add Book'},
                          {'id':'2','name':'Delete Multiple'},
                          {'id':'3','name':'History'},
                          {'id':'4','name':'Log out'}]


  constructor() { }
  
}

export interface navTypes{
  id: string;
  name: string;
}
