import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_module/category';




@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }


  public getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiBaseEndpointUrl}categories`);

  }

  public saveCategorie(category: Category): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiBaseEndpointUrl}categories`, category);
  }

  public updateCategorie(category: Category): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiBaseEndpointUrl}categories`, category);
  }

  public deleteCategorie(guid: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiBaseEndpointUrl}categories/${guid}`);
  }


}
