import { Component, OnInit } from '@angular/core';
import { CrudService } from './../service/crud.service';
import { FormGroup, FormControl } from '@angular/forms';

import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  Question:any = [];
  selected_answer:any = '';




  constructor(private crudService: CrudService, public fb: FormBuilder) { }

  questionForm = this.fb.group({
    question_options: ['', [Validators.required]]
  })


  get questionFormElement() {
    return this.questionForm.get('question_options');
  }

  ngOnInit(): void {
    this.crudService.GetQuestion().subscribe(res=>{
      console.log(res)
      this.Question = res;
    })
  }

  onSubmit(): boolean{
   // this.isSubmitted = true;
    if(!this.questionForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.questionForm.value));
      return true;
    }
  }

}
