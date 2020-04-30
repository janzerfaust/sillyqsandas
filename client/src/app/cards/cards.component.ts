import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { CardsService } from './cards.service';
import { CardPair } from '../model/cardpair';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  saveForm;

  constructor(private formBuilder: FormBuilder,
    private cardsService: CardsService) {
    this.saveForm = formBuilder.group({question: '', answer: ''});
  }

  ngOnInit() {
  }

  onSubmit(cardData: CardPair) {
    console.log(cardData);
    this.cardsService.addCardPair({ question: cardData.question, answer: cardData.answer})
    .subscribe();
  }

}
