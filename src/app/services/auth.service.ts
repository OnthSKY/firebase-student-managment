import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  // for login
  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['dashboard']);
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
      () => {
        alert('Registration Successfull');
        this.router.navigate(['login']);
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
}
