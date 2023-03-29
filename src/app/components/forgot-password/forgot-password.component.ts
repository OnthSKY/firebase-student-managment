import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private authService: AuthService) {}

  send() {
    if (this.email.touched && this.email.valid) {
      // this.authService.forgotPassword(this.email.value!)
      console.log(this.email.value);
    }
  }
}
