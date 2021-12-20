import { ChecklistEditComponent } from './../checklist-edit/checklist-edit.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Checklist } from './../../_module/checklist';
import { CATEGORY_DATA } from './../category/category.component';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/dialog/dialog.component';

export const CHECKLIST_DATA = [
  {
    guid: 'aaa-bbb-ccc-ddd', completed: false, deadline: Date.now(), postDate: Date.now(),
    descripition: "Consulta com o Oftalmologistaa", category: CATEGORY_DATA.find(x => x.name == "Saúde")
  },
  {
    guid: 'aaa-bbb-ccc-ddd', completed: true, deadline: Date.now(), postDate: Date.now(),
    descripition: "Ir ao Supermercado", category: CATEGORY_DATA.find(x => x.name == "Trabalho")

  }
]


@Component({
  selector: 'app-cheklist',
  templateUrl: './cheklist.component.html',
  styleUrls: ['./cheklist.component.css']
})
export class CheklistComponent implements OnInit {


  public displayedColumns: string[] = ['id', 'completed', 'descripition', 'deadline', 'postDate', 'category', 'actions'];
  public dataSource = CHECKLIST_DATA;




  constructor(private diaolog: MatDialog) { }

  ngOnInit(): void {
  }
  public createNewItem() {
    this.diaolog.open(ChecklistEditComponent, {
      disableClose:true, data : { actionName:'Editar'},
    }).afterClosed().subscribe( resp => {
      console.log('fechando modal de Criação de novo item');

    })
  }

  public updateStatus(status: boolean) {
    console.log('estado alterado');
  }

  public deleteChecklist(checklistItem: Checklist) {
    this.diaolog.open(DialogComponent, {
      disableClose: true, data: {
        msg: 'Tem certeza que deseja apagar o item?', leftButtonLabel: 'Cancelar', rightButtonLabel: 'ok'
      }
    }).afterClosed().subscribe(resp=>{
      console.log("deleteado com sucesso");
    })

    console.log('deletando o elemento');
  }
  public updateChecklist(checklistItem: Checklist) {
    console.log('Atualizando o elemento');
    this.diaolog.open(ChecklistEditComponent, {
      disableClose:true, data : { updatableChecklistItem: checklistItem, actionName:'Editar'},
    }).afterClosed().subscribe( resp => {
      console.log('fechando modal de edição');

    })

  }
}
