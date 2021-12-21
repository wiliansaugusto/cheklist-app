import { SnackBarService } from './../../services/snack-bar.service';
import { ChecklistService } from './../../services/checklist.service';
import { Checklist } from 'src/app/_module/checklist';
import { ChecklistEditComponent } from './../checklist-edit/checklist-edit.component';
import {  MatDialog } from '@angular/material/dialog';
  import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/dialog/dialog.component';




@Component({
  selector: 'app-cheklist',
  templateUrl: './cheklist.component.html',
  styleUrls: ['./cheklist.component.css']
})
export class CheklistComponent implements OnInit {


  public displayedColumns: string[] = ['id', 'completed', 'descripition', 'deadline', 'postDate', 'category', 'actions'];
  public dataSource : Checklist[] = [];





  constructor(private diaolog: MatDialog, private checklistService : ChecklistService, private snackbarSevice : SnackBarService) {
    this.checklistService.getAllChecklist().subscribe(
      (resp : Checklist[])=>{
        this.dataSource = resp;
      }
    )
   }

  ngOnInit(): void {
  }
  public createNewItem() {
    this.diaolog.open(ChecklistEditComponent, {
      disableClose: true, data: { actionName: 'Editar' },
    }).afterClosed().subscribe(resp => {
      this.snackbarSevice.showSnackBar('Item criado om sucesso', 'OK', 6);

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
    }).afterClosed().subscribe(resp => {
      if(resp){
        this.snackbarSevice.showSnackBar('Item apagado om sucesso', 'OK', 6);

      }
    })

    console.log('deletando o elemento');
  }
  public updateChecklist(checklistItem: Checklist) {
    console.log('Atualizando o elemento');
    this.diaolog.open(ChecklistEditComponent, {
      disableClose: true, data: { updatableChecklistItem: checklistItem, actionName: 'Editar' },
    }).afterClosed().subscribe(resp => {
      this.snackbarSevice.showSnackBar('Item editado om sucesso', 'OK', 6);

    })

  }
}
