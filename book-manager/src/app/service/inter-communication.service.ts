import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterCommunicationService {
  headerTypes: string[] = ['Books', 'Favourite'];

  constructor() { }
  
}
