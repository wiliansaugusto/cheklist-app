import { SnackBarService } from './../../services/snack-bar.service';
import { Category } from 'src/app/_module/category';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input() public editableCategory!: Category;
  @Input() public actionName = 'Editar';

  @Output() closeModalEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild("categoryFormDirective") public categoryFormDirective!: FormGroupDirective;

  public categoryForm!: FormGroup;

  public isFormReady = false

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackBarService: SnackBarService) {

  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [this.editableCategory != null ? this.editableCategory.name : '', Validators.required],
    })
    this.isFormReady = true;
  }


  public cancel() {
    this.closeModalEventEmitter.emit(true);
  }

  public save() {

    if (this.categoryForm.valid) {
      if (this.actionName == "Editar") {

        var updateCategory = {
          guid: this.editableCategory.guid,
          name: this.categoryForm.value['name']
        };

        this.categoryService.updateCategorie(updateCategory)
          .subscribe((resp: any) => {
            this.snackBarService.showSnackBar('Categoria atualizada com sucesso', "OK")

          }, (err: any) => {

            this.snackBarService.showSnackBar("Não foi possivel atualizar a categoria, tente novamente", "OK");

          })

      } else {

        this.categoryService.saveCategorie(this.categoryForm.value)
          .subscribe((resp: any) => {
            this.snackBarService.showSnackBar("Criação da categoria efetuada com sucesso", "OK");

          }, (err: any) => {

            this.snackBarService.showSnackBar("Não foi possivel criar a nova categoria, tente novamente", "OK");

          })
      }
    }
    this.clearForm();

  }

  public clearForm() {
    this.categoryForm.reset();
    this.categoryFormDirective.resetForm();
    this.closeModalEventEmitter.emit(true);
  }
}


