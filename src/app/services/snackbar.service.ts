import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackbarService {
  constructor(
    public snackBar: MatSnackBar
  ) { }

  public open(message: string, action = "close", className, timeDuration = 15000) {
    let ref = this.snackBar.open(message, action, {
      duration: timeDuration,
      panelClass: 'black-snackbar'
    });
    return ref;

  }

}
