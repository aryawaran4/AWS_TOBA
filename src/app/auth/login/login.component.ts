import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`
  .bg-waves{
    background: url("/assets/pattern.svg");
  }
  `]
})
export class LoginComponent implements OnInit {

  public isPasswordVisible = false;

  formLogin = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private sn: SnackbarService,
    private route: Router
  ) { }

  loginUser(){
    this.route.navigate(['dashboard'])
    // this.auth.loginUser(this.formLogin.value)
    // .subscribe(
    //   res => {
    //     console.log(res);
    //     localStorage.setItem('token', res.token)
    //     this.router.navigate(['dashboard'])
    //   },
    //   err => console.log('login', err)
    // )
  }

  ngOnInit(): void {
  }


}
