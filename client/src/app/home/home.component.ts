import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cards/cards.service';
import { CardPair } from '../model/cardpair';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  randomPair: CardPair = { question: '', answer: ''};

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
    this.getPair();
  }

  getPair() {
    this.cardsService.getRandomPair()
    .subscribe(data => { this.randomPair = data; console.log(data) });
  }

}
