import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
 @Input() answers: any;
 @Input() answersPercents: number[] = [];
 @Output() sendEvent = new EventEmitter<boolean>();

 ngOnInit(): void {
  this.sendEvent.emit(false);
 }

 bubbleClick() {
    this.sendEvent.emit(true);
  }
}
