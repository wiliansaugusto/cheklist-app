import { SnackBarService } from './../../services/snack-bar.service';
import { ChecklistService } from './../../services/checklist.service';
import { Checklist } from 'src/app/_module/checklist';
import { ChecklistEditComponent } from './../checklist-edit/checklist-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/dialog/dialog.component';




@Component({
  selector: 'app-cheklist',
  templateUrl: './cheklist.component.html',
  styleUrls: ['./cheklist.component.css']
})
export class CheklistComponent implements OnInit {


  public displayedColumns: string[] = ['id', 'isCompleted', 'description', 'deadline', 'postDate', 'category', 'actions'];
  public dataSource: Checklist[] = [];


  constructor(private diaolog: MatDialog,
    private checklistService: ChecklistService,
    private snackbarSevice: SnackBarService) {
    this.allChecklist();
  }

  allChecklist() {
    this.checklistService.getAllChecklist().subscribe(
      (resp: Checklist[]) => {
        this.dataSource = resp;
      }
    )
  }

  ngOnInit(): void {
  }
  public createNewItem() {
    this.diaolog.open(ChecklistEditComponent, {
      disableClose: true, data: { actionName: 'Item Novo' },
    }).afterClosed().subscribe(resp => {
      this.allChecklist();
    })
  }

  public deleteChecklist(checklistItem: Checklist) {
    this.diaolog.open(DialogComponent, {
      disableClose: true, data: {
        msg: 'Tem certeza que deseja apagar o item?', leftButtonLabel: 'Cancelar', rightButtonLabel: 'ok'
      }
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.checklistService.deleteChecklist(checklistItem.guid).subscribe(
          (resp: any) => {
            this.allChecklist();
            this.snackbarSevice.showSnackBar('Item apagado om sucesso', 'OK', 6);
          }, (err: any) => {
            this.snackbarSevice.showSnackBar('Item não pode ser apagado', 'OK', 6);

          }
        )
      }
    })

  }
  public updateChecklist(checklistItem: Checklist) {
    console.log('Atualizando o elemento');
    this.diaolog.open(ChecklistEditComponent, {
      disableClose: true, data: { updatableChecklistItem: checklistItem, actionName: 'Editar' },
    }).afterClosed().subscribe(resp => {
      this.snackbarSevice.showSnackBar('Item editado om sucesso', 'OK', 6);
      this.allChecklist();
    })

  }
  public updateCompleteStatus(guid: string, flag: boolean) {
    this.checklistService.updateStatus(guid, flag)
      .subscribe(
        (resp: any) => {
          this.snackbarSevice.showSnackBar("Status alterdo com sucesso", "OK")
          this.allChecklist();
        }, (erro: any) => {
          this.allChecklist();
          this.snackbarSevice.showSnackBar("Não foi possivel alterar o status", "OK");
        }
      )

  }
}
