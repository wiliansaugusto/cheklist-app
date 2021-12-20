import { Category } from 'src/app/_module/category';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input() public editableCategory!: Category;
  @Input() public actionName = 'Editar';

  @Output() closeModalEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public categoryForm! : FormGroup;

  public isFormReady = false

  constructor(private formBuilder : FormBuilder) {

  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [this.editableCategory != null ? this.editableCategory.name : '', Validators.required],
  })
  this.isFormReady = true;
  }


  public cancel(){
    console.log('cancelar Clicado');
    this.closeModalEventEmitter.emit(false);

  }

  public save(){
    console.log('SAVE clicado');
    this.closeModalEventEmitter.emit(true);

  }
}


