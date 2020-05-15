import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardPair } from '../model/cardpair';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  addCardPair(cardPair: CardPair) {
    console.log(localStorage.getItem('questions'));
    return this.http.post<CardPair>('/sqa/cards/create', cardPair);      
  }

  getRandomPair() {
    return this.http.get<CardPair>('sqa/cards/randompair');
  }
}
