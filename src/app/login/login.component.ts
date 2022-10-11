import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login-service/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    this.loginService.login(JSON.stringify(this.form.value)).subscribe((res: any) => {
      sessionStorage.setItem('jwt', res.jwt);
      this.router.navigate(['']);
    }, (err: any) => {
      alert(err.error);
    })
  }

}
