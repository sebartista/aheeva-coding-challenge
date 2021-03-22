import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  //TODO:: animate the score
  @Input() player_score: number = 0; // decorate the property with @Input()

  constructor() { }

  ngOnInit(): void {

  }

}
