import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { angularQuestions  } from '../utils';

@Component({
  selector: 'app-domande',
  standalone: true,
  imports: [NgFor, NgIf, SummaryComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class DomandeComponent implements OnInit {
  @Output() sendEvent = new EventEmitter<boolean>();

  angularQuestions = angularQuestions;
    
  indexQuestion = 0;
  timer = 7000;
  remainingTime = this.timer;
  timerInterval: any;
  answers: any[] = [];
  answersPercents: number[] = [];

  answersSkippedPercent: number = 0;
  answersCorrectPercent: number = 0;
  answersWrongPercent: number = 0;

  totalAnswersGiven = this.angularQuestions.length;

  eventEmit(eventData: boolean) {
    this.sendEvent.emit(eventData)
  }

constructor() { }

checkClearInterval(indexQuestion: number): void{
  if(indexQuestion === 6){
    clearInterval(this.timerInterval);
  }
}

  ngOnInit(): void {
    this.startTimer();
  }

  calculatePercentages(): number[] {
    let skippedAnswers = this.answers.filter((answer) => answer.correction === "skipped").length;
    let correctAnswers = this.answers.filter((answer) => answer.correction === "correct").length;
    let wrongAnswers = this.answers.filter((answer) => answer.correction === "wrong").length;

    this.answersSkippedPercent = Math.floor((100 / this.totalAnswersGiven) * skippedAnswers);
    this.answersCorrectPercent = Math.floor((100 / this.totalAnswersGiven) * correctAnswers);
    this.answersWrongPercent = Math.floor((100 / this.totalAnswersGiven) * wrongAnswers);

    return [this.answersSkippedPercent, this.answersCorrectPercent, this.answersWrongPercent];
  }


startTimer(): void {
  this.timerInterval = setInterval(() => {
    if (this.remainingTime < -10) {
      this.nextQuestionAnswered("skipped", this.indexQuestion, null);
    } else {
      this.remainingTime -= 10;
    }
  }, 10);
}

resetTimer(): void {
  clearInterval(this.timerInterval);
  this.startTimer();
  this.remainingTime = this.timer; 
}

nextQuestionAnswered(answerText: string, index: number | null, indexAnswer: number | null): void {

  if(answerText === "skipped"){
    this.answers.push({
      text: "Answer skipped",
      index: index,
      correction: "skipped",
    });
  } else {
    let correctionAnswer;
    if(indexAnswer === 0){
      correctionAnswer = "correct";
    }else{
      correctionAnswer = "wrong";
    }
    this.answers.push({
      text: answerText,
      index: index,
      correction: correctionAnswer,
    });
  }

  this.answersPercents = this.calculatePercentages();
  this.indexQuestion++;
  this.resetTimer();
  this.checkClearInterval(this.indexQuestion);
}
}
