import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SplashComponent } from './splash/splash.component';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'login',
      // },
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
  // {
  //   path: 'splash',
  //   component: SplashComponent,
  // },
];

@NgModule({
  declarations: [
    LoginComponent,
    SplashComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [RouterModule]
})
export class AuthModule { }
