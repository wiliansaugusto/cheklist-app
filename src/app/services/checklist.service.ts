import { Checklist } from 'src/app/_module/checklist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private httpClient: HttpClient) { }


  public getAllChecklist(): Observable<Checklist[]> {
    return this.httpClient.get<Checklist[]>(`${environment.apiBaseEndpointUrl}checklist`);
  }


  public saveChecklist(checklist: any): Observable<string>{
    return this.httpClient.post<string>(`${environment.apiBaseEndpointUrl}checklist`, checklist);
  }

  public updateChecklist(checklist : Checklist): Observable<void>{
    return this.httpClient.put<void>(`${environment.apiBaseEndpointUrl}checklist`, checklist);
  }

  public deleteChecklist(guid: string): Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiBaseEndpointUrl}checklist/${guid}`);
  }

  public updateStatus(guid :  string, flag : boolean): Observable<void>{
    return this.httpClient.patch<void>(`${environment.apiBaseEndpointUrl}checklist/${guid}`,{isCompleted : flag});
  }
}
