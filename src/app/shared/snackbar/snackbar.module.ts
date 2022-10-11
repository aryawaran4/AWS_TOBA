import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackbarComponent } from './snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
  ]
})
export class SnackbarModule { }
