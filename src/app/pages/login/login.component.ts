import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showLogin!: boolean;
  showReg!: boolean;

  loginForm!: FormGroup;
  regForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  showLoginClick() {
    this.showLogin = true;
    this.showReg = false;
  }

  showRegClick() {
    this.showLogin = false;
    this.showReg = true;
  }

  login() {
    this.userService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/']);
        } else {
          alert('wrong');
        }
      });
  }

  register() {
    if (this.regForm.value.password === this.regForm.value.passwordRepeat) {
      this.userService
        .register(
          this.regForm.value.username,
          this.regForm.value.password,
          this.regForm.value.email,
          this.regForm.value.passwordRepeat
        )
        .subscribe((res) => {
          if (res) {
            this.userService
              .login(this.regForm.value.username, this.regForm.value.password)
              .subscribe((res) => {
                if (res) {
                  this.router.navigate(['/']);
                } else {
                  alert('wrong');
                }
              });
          } else {
            alert('something went wrong');
          }
        });
    }
  }

  ngOnInit(): void {
    this.showLogin = true;
    this.showReg = false;

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.regForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordRepeat: new FormControl('', [Validators.required]),
    });
  }
}
