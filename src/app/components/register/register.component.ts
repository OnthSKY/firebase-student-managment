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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  user: User | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  checkIsValid(formControlName: string) {
    if (
      this.registerForm.get(formControlName)?.invalid &&
      this.registerForm.get(formControlName)?.touched
    )
      return true;
    return false;
  }

  getErrors(formControlName: string) {
    let errors: string[] = [];
    if (this.registerForm.get(formControlName)?.errors?.['required'])
      errors.push('Bu alanı doldurmak zorundasınız !');

    if (this.registerForm.get(formControlName)?.errors?.['minlength'])
      errors.push('Bu alan en az 7 karakterden oluşmak zorundadır !');

    if (this.registerForm.get(formControlName)?.errors?.['email'])
      errors.push('Geçerli bir email adresi giriniz !');

    return errors;
  }

  register() {
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      // console.log(this.user);
      this.authService.register(this.user?.email!, this.user?.password!);
    } else {
      alert('Something went wrong');
    }
  }
}
