import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
 private defaultDuration: number = 4;

  constructor(private snackBar : MatSnackBar) { }

  public showSnackBar(message : string, action : string, durationParam?: number){
    this.snackBar.open(message, action,
       {duration :durationParam!= null? durationParam *1000: this.defaultDuration*1000});
  }
}
