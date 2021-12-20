import { CategoryEditComponent } from './../category-edit/category-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_module/category';
import { DialogComponent } from 'src/app/dialog/dialog.component';

export const CATEGORY_DATA = [
  { id: '1', name: 'Educação', guid: 'aaa-bbb-ccc-ddd' },
  { id: '2', name: 'Saúde', guid: 'aaa-bbb-ccc-ddd' },
  { id: '3', name: 'Trabalho', guid: 'aaa-bbb-ccc-ddd' },
  { id: '4', name: 'Outros', guid: 'aaa-bbb-ccc-ddd' },
]


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})


export class CategoryComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = CATEGORY_DATA;
  constructor(private diaologue: MatDialog) { }

  ngOnInit(): void {
  }

  public editCatergory(inputCategory: Category) {

    this.diaologue.open(CategoryEditComponent, {
      disableClose: true,
      data: { editableCategory: inputCategory }
    })
      .afterClosed().subscribe(
        resp => {
          if (resp) {
            console.warn('categoria Editada com sucesso')

          } else {
            console.warn('categoria não editada ')

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
        resp => {
          if (resp) {
            console.warn('categoria apagada com sucesso')

          } else {
            console.warn('categoria não apagada ')

          }

        }
      )

  }
  public createNewCategory() {
    console.warn('clicado no create');
    this.diaologue.open(CategoryEditComponent, {
      disableClose: true,
      data: { actionName : 'Criar' }
    })
      .afterClosed().subscribe(
        resp => {
          if (resp) {
            console.warn('categoria criada com sucesso')

          } else {
            console.warn('Não Foi possivel criar a categoria ')

          }

        }
      )
  }
}
