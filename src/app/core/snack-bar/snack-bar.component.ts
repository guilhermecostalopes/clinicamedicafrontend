import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
  timeOut = 1500;

  constructor(public snackBar: MatSnackBar) { }

  /**
* @param message = Message you want to appear
* @param className = It's not mandatory. It may be success or error. If it is null it will be the default of the component.
* @param action = Name of the action that must be performed when clicking on the text.
* @param verticalPosition = Vertical position. It can be: 'top' or 'bottom'. Default: 'bottom'
* @param horizontalPosition = Horisontal position. It can be: 'start' | 'center' | 'end' | 'left' | 'right'. Default: 'center'
*/
  openSnackBar(
    message: string,
    className?: string,
    action?: string,
    verticalPosition?: any,
    horizontalPosition?: any
  ) {
    className = className !== null || className !== undefined ? 'mat-snack-bar-container-' + className : className;
    verticalPosition =
      verticalPosition === null || verticalPosition === undefined
        ? 'bottom'
        : verticalPosition;
    horizontalPosition =
      horizontalPosition === null || horizontalPosition === undefined
        ? 'center'
        : horizontalPosition;
    this.snackBar.open(message, action, {
      duration: this.timeOut,
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition,
      panelClass: [className],
    });
  }
}
