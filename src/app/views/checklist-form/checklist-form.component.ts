import { CategoryService } from './../../services/category.service';
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

  public categories : Category[]= [];
  public checklistForm!: FormGroup;

  constructor( private formBuilder: FormBuilder, private categoryService : CategoryService) {


   }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (resp : Category[])=>{
        this.categories = resp;
        this.createForm();
      }
    )


  }

  private createForm(){
    this.checklistForm = this.formBuilder.group({
      completed : [this.checklistItem != null? this.checklistItem.completed : false, [Validators.required]],
      descripition : [this.checklistItem != null? this.checklistItem.descripition : "", [Validators.required]],
      deadline : [this.checklistItem != null?  new Date(this.checklistItem.deadline) : new Date(), [Validators.required]],
      category : [this.checklistItem != null? this.checklistItem.category : null, [Validators.required]],


    });
  }
  public cancel(){
    this.formCloseEvent.emit(false);
  }
  public save(){
    this.formCloseEvent.emit(true);
   // this.clearForm();

  }

}
