import { ChecklistService } from './../../services/checklist.service';
import { CategoryService } from './../../services/category.service';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Checklist } from 'src/app/_module/checklist';
import { Category } from 'src/app/_module/category';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  @Input() public actionName = "Editar";
  @Input() public checklistItem!: Checklist;

  @Output() public formCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild("checklistFormDirective") checklistFormGroupDirective !: FormGroupDirective;

  public categories: Category[] = [];
  public checklistForm!: FormGroup;

  public isFormReadyChecklist = false;


  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService
    ,private snackBarService: SnackBarService
    ,private checklistService : ChecklistService) {


  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (resp: Category[]) => {
        this.categories = resp;

      },(error : any)=>{
        console.log('ocorreu um erro ao chamar a API ${error}');

      }

    )
    this.isFormReadyChecklist = true;
    this.createForm();

  }

  private createForm() {
    this.checklistForm = this.formBuilder.group({
      isCompleted: [this.checklistItem != null ? this.checklistItem.isCompleted : false, [Validators.required]],
      description: [this.checklistItem != null ? this.checklistItem.description : "", [Validators.required]],
      deadline: [this.checklistItem != null ? new Date(this.checklistItem.deadline) : new Date(), [Validators.required]],
      category: [this.checklistItem != null ? this.checklistItem.category : null, [Validators.required]]
    });
  }

  public cancel() {
    this.formCloseEvent.emit(false);
  }

  public save() {

    if (this.checklistForm.valid) {

      if (this.actionName == "Editar") {
        var updateChecklistItem : Checklist =  {
          guid: this.checklistItem.guid,
          isCompleted: this.checklistForm.value['isCompleted'],
          description: this.checklistForm.value['description'],
          deadline: this.checklistForm.value['deadline'],
          category: this.checklistForm.value['category'],
          postDate: new Date,

        }
        this.checklistService.updateChecklist(updateChecklistItem)
        .subscribe(
          (resp: any) =>{
            this.snackBarService.showSnackBar("Checklist Atualizado com sucesso", "OK");

          }, (err : any)=>{
            this.snackBarService.showSnackBar("Item do Checklist não foi possivel ", "OK");
          }
        )
      }else{

        this.checklistService.saveChecklist(this.checklistForm.value)
        .subscribe(
          (resp : any) =>{
            this.snackBarService.showSnackBar("Item Criado com sucesso!", "OK")
          }, (err : any) =>{
            this.snackBarService.showSnackBar("Não foi possivel criar o item","ok")
          }
        )
      }
    }
    this.clearForm();

  }
  public clearForm() {
    this.checklistForm.reset();
    this.checklistFormGroupDirective.resetForm();
    this.formCloseEvent.emit(true);
  }
  public compareCategory(categoryOne : Category, categoryTwo : Category){
    return (categoryOne != null && categoryTwo !== null)&&( categoryOne.guid == categoryTwo.guid)
  }
}
