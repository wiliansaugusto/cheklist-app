import { Component, OnInit } from '@angular/core';
import { Checklist } from 'src/app/_module/checklist';

@Component({
  selector: 'app-checklist-edit',
  templateUrl: './checklist-edit.component.html',
  styleUrls: ['./checklist-edit.component.css']
})
export class ChecklistEditComponent implements OnInit {

  public actionName = "Editar";
  public checklistItem!: Checklist;

  constructor() { }

  ngOnInit(): void {
  }
  public formClose($event:any){

  }
}
