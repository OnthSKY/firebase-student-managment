import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  // for login
  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');

        if (res.user?.emailVerified == true) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['verify-email']);
        }
      },
      (err) => {
        alert(`Something went wrong :  ${err}`);
        this.router.navigate(['login']);
      }
    );
  }

  // for register
  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration Successfull');
        this.router.navigate(['login']);
        this.sendEmailVerification(res.user);
      },
      (err) => {
        alert(`Something went wrong :  ${err}`);
        this.router.navigate(['login']);
      }
    );
  }

  // for logout
  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      },
      (err) => {
        alert(`Something went wrong :  ${err}`);
      }
    );
  }

  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['verify-email']);
      },
      (err) => {
        alert('Something went wrong !');
      }
    );
  }

  sendEmailVerification(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['verify-email']);
      },
      (err: any) => {
        alert('Somethin went wrong.Not able to send email to your email');
      }
    );
  }

  googleSingIn() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        localStorage.setItem('token', JSON.stringify(res.credential));
        this.router.navigate(['dashboard']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
