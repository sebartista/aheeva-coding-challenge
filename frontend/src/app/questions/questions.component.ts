import { Component, OnInit } from '@angular/core';
import { CrudService } from './../service/crud.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition,
  AnimationEvent,
  query,
  stagger,
} from '@angular/animations';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1, display: 'block' })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0, display: 'none' })),
      ]),
    ]),
    trigger('pageAnimations', [
      transition(':enter', [
        query('label', [
          style({ opacity: 0, transform: 'translateY(-10px)' }),
          stagger(-30, [
            animate(
              '500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            ),
          ]),
        ]),
      ]),
      transition(':leave', [
        query('label', [
          style({ opacity: 1, transform: 'translateY(10px)' }),
          stagger(-30, [
            animate(
              '500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 0, transform: 'none' })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class QuestionsComponent implements OnInit {
  question_data: any = [];

  questionForm: FormGroup; //form holder variable

  isQuestionShown = true;
  isWinShown = false;
  isFailShown = false;
  isEndGame = false;

  answered_questions_ids: any = []; //holds the answered questions

  lottie_options: AnimationOptions = {
    path: '/assets/50486-rocket.json',
  };

  player_score:number = 0;

  constructor(private crudService: CrudService, public fb: FormBuilder) {
    //bulid the form in the constructor
    this.questionForm = this.fb.group({
      options: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //first request sends no data to get first question
    //this is for filtering questions in subsuquents calls
    this.crudService.GetQuestion('').subscribe((res) => {
      this.question_data = res;
      this.generateForm(); // function to reset of the form and validation
    });
  }



  validateAnswer(answer: any) {
    this.crudService.ValidateAnswer(answer.options).subscribe((res) => {
      if (res) {
        //handle view state valid answer
        this.isQuestionShown = false;
        this.isWinShown = true;
        this.isFailShown = false;
        // store answered question
        this.answered_questions_ids.push(this.question_data[0]._id.toString());
        this.player_score += 1000;
      } else {
        //handle view state invalid answer
        this.isWinShown = false;
        this.isQuestionShown = false;
        this.isFailShown = true;
      }
    });
  }

  //regenerates the form for validations
  generateForm() {
    this.questionForm = this.fb.group({
      options: ['', [Validators.required]],
    });
  }

  onSubmit(): boolean {
    if (!this.questionForm.valid) {
      return false;
    } else {
      this.validateAnswer(this.questionForm.value);
      return true;
    }
  }

  onNextQuestion() {
    //check win

    if (this.answered_questions_ids.length == 100) {
      this.isEndGame = true;
      this.isQuestionShown = false;
      this.isWinShown = false;
      this.isFailShown = false;
    } else {
      //send answered_ids
      this.crudService
        .GetQuestion(this.answered_questions_ids.toString())
        .subscribe((res) => {
          this.question_data = res;
          this.generateForm();
          //animation control
          this.isQuestionShown = true;
          this.isWinShown = false;
          this.isFailShown = false;
        });
    }
  }

  onTryAgain() {

    this.answered_questions_ids = []; //reset answered ids
    this.player_score = 0;
    this.crudService
        .GetQuestion("")
        .subscribe((res) => { //using crud service callback to wait data for ui update
          this.question_data = res;
          this.generateForm();
          //animation control
          this.isQuestionShown = true;
          this.isWinShown = false;
          this.isFailShown = false;
        });



  }

  onAnimationEvent(event: AnimationEvent) {
    // // openClose is trigger name in this example
    // console.warn(`Animation Trigger: ${event.triggerName}`);
    // // phaseName is start or done
    // console.warn(`Phase: ${event.phaseName}`);
    // // in our example, totalTime is 1000 or 1 second
    // console.warn(`Total time: ${event.totalTime}`);
    // // in our example, fromState is either open or closed
    // console.warn(`From: ${event.fromState}`);
    // // in our example, toState either open or closed
    // console.warn(`To: ${event.toState}`);
    // // the HTML element itself, the button in this case
    // console.warn(`Element: ${event.element}`);
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
