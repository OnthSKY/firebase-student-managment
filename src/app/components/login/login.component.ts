import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  user: User | undefined;
  constructor(private formBuilder: FormBuilder, private authService:AuthService) {
    this.loginForm = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  checkIsValid(formControlName: string) {
    if (
      this.loginForm.get(formControlName)?.invalid &&
      this.loginForm.get(formControlName)?.touched
    )
      return true;
    return false;
  }

  getErrors(formControlName: string) {
    let errors: string[] = [];
    if (this.loginForm.get(formControlName)?.errors?.['required'])
      errors.push('Bu alanı doldurmak zorundasınız !');

    if (this.loginForm.get(formControlName)?.errors?.['minlength'])
      errors.push('Bu alan en az 7 karakterden oluşmak zorundadır !');

    if (this.loginForm.get(formControlName)?.errors?.['email'])
      errors.push('Geçerli bir email adresi giriniz !');

    return errors;
  }

  login() {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      // console.log(this.user);
      this.authService.login(this.user?.email!, this.user?.password!)
    } else {
      alert('Something went wrong');
    }
  }
}
