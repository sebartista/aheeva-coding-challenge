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


  constructor(private crudService: CrudService, public fb: FormBuilder) {
    this.questionForm = this.fb.group({
      options: ['', [Validators.required]]
    });
  }



  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion(){
    this.crudService.GetQuestion().subscribe(res=>{
      this.question_data = res;
    });
  }

  onSubmit(): boolean{
   // this.isSubmitted = true;
    if(!this.questionForm.valid) {
      console.log("form invalid");
      return false;
    } else {
      alert(JSON.stringify(this.questionForm.value));
      return true;
    }
  }

}
