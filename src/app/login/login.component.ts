import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: any;
  error = '';
  token;
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  generateString(length) {
    let result = ' ';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    return result;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.httpClient.get<any>('assets/data/users.json').subscribe(
      (data) => {
        // adding code here
        this.user = data.users.find(
          (x) =>
            x.email == this.f.username.value &&
            x.password == this.f.password.value
        );
        console.log(this.user);
        localStorage.setItem('accessToken', this.generateString(20));
        localStorage.setItem('user', this.user.user_id); // temp
        this.router.navigate(['home']);
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
