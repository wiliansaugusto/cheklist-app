import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../_module/category';


export const CATEGORY_DATA = [
  { id: '1', name: 'Educação', guid: 'aaa-bbb-ccc-ddd' },
  { id: '2', name: 'Saúde', guid: 'aaa-bbb-ccc-ddd' },
  { id: '3', name: 'Trabalho', guid: 'aaa-bbb-ccc-ddd' },
  { id: '4', name: 'Outros', guid: 'aaa-bbb-ccc-ddd' },
]


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }


  public getAllCategories(): Observable<Category[]>{
    return of(CATEGORY_DATA);

  }
}
