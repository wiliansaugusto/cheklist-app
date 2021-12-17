import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public diaologueMsg = "Deseja continuar essa ação";
  public leftButtonLabel = "Cancelar";
  public rightButtonLabel = "OK";

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data.leftButtonLabel != null){
        this.leftButtonLabel = data.leftButtonLabel;
      }
      if(data.rightButtonLabel != null){
        this.rightButtonLabel = data.rightButtonLabel;
      }
      if(data.diaologue != null){
        this.diaologueMsg = data.diaologueMsg;
      }
    }

  ngOnInit(): void {
  }

  public clickedLeftBtn(){
      this.dialogRef.close(false);
  }
  public clickedRightBtn(){
    this.dialogRef.close(true);
  }
}
