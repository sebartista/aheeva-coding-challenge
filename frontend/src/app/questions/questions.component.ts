import { Component, OnInit } from '@angular/core';
import { CrudService } from './../service/crud.service';
import { FormBuilder, Validators,FormGroup, FormControl, FormArray } from "@angular/forms";
import { Question } from '../service/Question';



@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})



export class QuestionsComponent implements OnInit {

  question_data:any = [];
  questionForm: FormGroup;
  question_fail = false;

  answered_questions_ids:any = [];

  //view attributes
  user_failed = false;
  hide_question = false;
  user_win = false;

  constructor(private crudService: CrudService, public fb: FormBuilder) {
    this.questionForm = this.fb.group({
      options: ['', [Validators.required]]
    });
  }



  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion(){
    //first request sends no data to get first question
    //this is for filtering questions in subsuquents calls
    this.crudService.GetQuestion("").subscribe(res=>{

      this.question_data = res;
      this.question_data[0].question = decodeURI(this.question_data[0].question);
      console.log(this.question_data);
    });
  }

  validateAnswer(answer:any){
    this.crudService.ValidateAnswer(answer.options).subscribe(res=>{
      if(res){
        this.hide_question = true;
        this.user_win = true;
        this.answered_questions_ids.push(this.question_data[0]._id.toString());

        //this.getQuestion();
      } else {
        this.hide_question = true;
        this.user_failed = true;
      }
    });
  }

  onSubmit(): boolean{
   // this.isSubmitted = true;
    if(!this.questionForm.valid) {
      console.log("form invalid");
      return false;
    } else {
      //alert(JSON.stringify(this.questionForm.value));
      this.validateAnswer(this.questionForm.value);
      return true;
    }
  }

  onNextQuestion(){

    //send answered_ids

    this.crudService.GetQuestion(this.answered_questions_ids.toString()).subscribe(res=>{
      this.question_data = res;
      this.question_data[0].uriquestion = this.question_data[0].question;
      console.log(this.question_data);
      this.user_win = false;
      this.hide_question = false;
    });
  }

  onTryAgain(){
    this.getQuestion();
    this.user_failed = false;
    this.hide_question = false;
  }


}
