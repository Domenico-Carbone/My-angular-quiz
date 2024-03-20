import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomandeComponent } from '../questions/questions.component';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [NgIf, DomandeComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnDestroy, OnInit {
  buttonStartIsClicked = false;
  button = false;
  
  handleEvent(eventData: boolean) {
    this.button = eventData;
  }
  
  setButtonClick(){
    this.buttonStartIsClicked = true;
    this.button = false;
  }

  ngOnInit(): void {
  this.buttonStartIsClicked = false;
  }

  ngOnDestroy(): void {
    this.buttonStartIsClicked = false;
  }
}
