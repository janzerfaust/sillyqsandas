import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { CardsService } from './cards.service';
import { CardPair } from '../model/cardpair';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  saveForm: FormGroup;
  saveOk: boolean = true;
  responseMessage: string;
  isSubmitted: boolean = false;
  validationErrorMessage: string;

  @ViewChild("question") questionField: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private cardsService: CardsService) {
    this.saveForm = formBuilder.group(
      {
        question: ['', Validators.required], 
        answer: ['', Validators.required],
        collection: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  onSubmit(cardData: CardPair) {    
    if(!this.saveForm.valid) {
      this.isSubmitted = true;
      this.validationErrorMessage = "Please provide both question and answer";
      return;
    }
    this.cardsService.addCardPair({ question: cardData.question, answer: cardData.answer, collection: cardData.collection})
    .subscribe((response) => this.handleResponse(response), (error) => this.handleError(error));
  }

  onChangeAnyController() {
    this.isSubmitted = false;
  }

  handleResponse(response) {
    // if ok
    const collection = this.saveForm.get('collection').value;
    this.saveForm.reset();
    this.saveForm.get('collection').setValue(collection);
    this.saveOk = true;
    this.responseMessage = "Saved!";
    this.questionField.nativeElement.focus();    
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }

  handleError(error) {
    this.saveOk = false;
    this.responseMessage = error;
  }

}
