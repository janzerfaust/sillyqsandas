import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  saveForm;

  constructor(private formBuilder: FormBuilder) {
    this.saveForm = formBuilder.group({question: '', answer: ''});
  }

  ngOnInit() {
  }

  onSubmit(cardData) {
    console.log(cardData);
  }

}
