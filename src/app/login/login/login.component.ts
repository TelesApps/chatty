import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isRegister = false;
  loginForm: FormGroup;
  userName = new FormControl('', [Validators.required, Validators.maxLength(22)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPass = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(public authService: AuthService, private router: Router) { }

   ngOnInit() {
    this.setLoginForm();
  }

  setLoginForm() {
    if (this.isRegister) {
      this.loginForm = new FormGroup({
        userName: this.userName,
        email: this.email,
        password: this.password,
        confirmPass: this.confirmPass
      })
    }
    else {
      this.loginForm = new FormGroup({
        email: this.email,
        password: this.password,
      })
    }
  }

  onLoginSubmit() {
    let confirmPass;
    let userName;
    console.log(this.isRegister);
    if (this.isRegister) {
      confirmPass = this.loginForm.get('confirmPass').value;
      userName = this.loginForm.get('userName').value;
    }
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value
    if (this.isRegister) {
      this.authService.registerNewUser(email, confirmPass, userName).then((value) => {
        this.isRegister = false;
        this.loginForm.reset();
        this.informUser('Verification Email Sent',
          'A new email was sent to you, please click on the link on it to verify your email, Thank you!');
      }).catch((error: any) => {
        this.loginForm.get('password').setValue('');
        this.loginForm.get('confirmPass').setValue('');
        this.informUser(error.code, error.message);
      });
    } else {
      this.authService.signinWithEmailAndPassword(email, password).then((user) => {
        this.loginForm.reset();
        this.router.navigate(['/']);
      }).catch((error: any) => {
        this.loginForm.get('password').setValue('');
        this.informUser(error.code, error.message);
      })
    }
  }

  async informUser(title: string, body: string) {
    // Implement the logic to inform the user about errors or success messages
  }

  checkPasswordMatch() {
    if (this.isRegister) {
      const pass = this.loginForm.get('password').value;
      const ver = this.loginForm.get('confirmPass').value;
      if (pass === ver) {
        console.log('matches')
      } else {
        console.log('not matching')
        this.loginForm.get('confirmPass').setErrors({ 'notMatch': true });
      }
    }
  }

  onRegister() {

  }

  onLoginWithGoogle() {
    this.authService.signInWithGoogle();
  }

  onLoginWithFacebook() {
    //this.authService.signInWithFacebook();
  }

}

