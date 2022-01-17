import { SnackBarService } from './../../services/snack-bar.service';
import { CategoryService } from './../../services/category.service';
import { CategoryEditComponent } from './../category-edit/category-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_module/category';
import { DialogComponent } from 'src/app/dialog/dialog.component';




@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})


export class CategoryComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = [];
  constructor(private diaologue: MatDialog,
    private categoryService: CategoryService,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.loadAllCategories();

  }

  private loadAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (resp: Category[]) => {
        this.dataSource = resp;
      })
  }
  public editCatergory(inputCategory: Category) {

    this.diaologue.open(CategoryEditComponent, {
      disableClose: true,
      data: { editableCategory: inputCategory }
    })
      .afterClosed().subscribe(
        (resp: any) => {

          if (resp) {
            this.loadAllCategories();
            this.snackBarService.showSnackBar('Cancelado com sucesso', 'OK',500);
          } else {
            this.loadAllCategories();


          }

        }
      )
  }

  public deleteCatergory(category: Category) {
    this.diaologue.open(DialogComponent, {
      disableClose: true,
      data: { diaologueMsg: "Você tem certeza que deseja apagar a categoria", leftButtonLabel: "Não", rightButtonLabel: "SIM" }
    })
      .afterClosed().subscribe(
        (        resp: any) => {
          if (resp) {
            this.snackBarService.showSnackBar('Categoria deletada com sucesso', 'OK', 10);
            this.categoryService.deleteCategorie(category.guid).subscribe(
              (resp: any) => {
                this.loadAllCategories();
                this.snackBarService.showSnackBar('Categoria Apagada com sucesso', "OK")
              }, (erro: any) => {
                this.snackBarService.showSnackBar('Categoria esta em uso', "OK")

              }
            )


          } else {
            this.snackBarService.showSnackBar('Não foi possivel deletar a categoria', 'Cancelado');

          }

        }
      )

  }
  public createNewCategory() {
    this.diaologue.open(CategoryEditComponent, {
      disableClose: true,
      data: { actionName: 'Criar' }

    })
      .afterClosed().subscribe(
        (resp : any) => {

          if(resp) {
            this.loadAllCategories();
          } else {
            this.loadAllCategories();

          }

        }
      )
  }



}
