import { CATEGORY_DATA } from './../category/category.component';
import { Component, Input, OnInit, Output , EventEmitter, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Checklist } from 'src/app/_module/checklist';
import { Category } from 'src/app/_module/category';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  @Input() public actionName = "Editar";
  @Input() public checklistItem!: Checklist;
  @Output() public formCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(FormGroupDirective) checklistFormGroupDirective !: FormGroupDirective;

  public categories : Category[]= CATEGORY_DATA;
  public checklistForm!: FormGroup;

  constructor( private formBuilder: FormBuilder) {

   }

  ngOnInit(): void {

this.checklistForm = this.formBuilder.group({
  completed : this.checklistItem != null? this.checklistItem.completed : false,
  descripition : this.checklistItem != null? this.checklistItem.descripition : "",
  deadeline : this.checklistItem != null? this.checklistItem.deadline : new Date(),
  category : this.checklistItem != null? this.checklistItem.category : null,


})
  }

  public cancel(){

  }
  public save(){

    this.clearForm();

  }
  private clearForm(){
    this.checklistForm.reset();
    this.checklistFormGroupDirective.resetForm();
  }
}
