import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../_module/category';
import { Checklist } from '../_module/checklist';


export const CHECKLIST_DATA = [
  {
    guid: 'aaa-bbb-ccc-ddd', completed: false, deadline: new Date(), postDate: new Date(),
    descripition: "Consulta com o Oftalmologistaa", category:{guid:'aaa-bbb-ccc-ddd', name:"Saúde", id:'5'}
  },
  {
    guid: 'aaa-bbb-ccc-ddd', completed: true, deadline: new Date(), postDate:new Date(),
    descripition: "Ir ao Supermercado", category:{guid:'aaa-bbb-ccc-ddd', name:"Tabalhos", id:'0'}
  }
]


@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor() { }


public getAllChecklist() : Observable<Checklist[]>{
  return of(CHECKLIST_DATA);
}

}
