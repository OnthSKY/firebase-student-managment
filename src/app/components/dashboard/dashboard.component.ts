import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Student } from 'src/app/models/student';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.min(3)]),
    });
  }

  ngOnInit() {
    this.getAllStudents();
  }
  studentToAdd: Student | undefined;
  students: Student[] | undefined;
  form: FormGroup;
  logout() {
    this.authService.logout();
  }
  getClass(formControlName: string): string {
    if (this.form.get(formControlName)?.untouched) return '';
    if (
      (this.form.get(formControlName)?.touched ||
        this.form.get(formControlName)?.dirty) &&
      this.form.get(formControlName)?.valid
    )
      return 'valid';
    else return 'invalid';
  }
  save() {
    if ((this.form.touched || this.form.dirty) && this.form.valid) {
      // console.log(this.form.value);
      this.studentToAdd = this.form.value;
      // the service will be call
      this.addStudent(this.studentToAdd!!);
      this.form.reset();

      alert('Öğrenci başarılı bir şekilde eklendi');
    } else {
      alert(
        'Öğrenci Ekleme Başarısız.\nBütün alanları doldurduğunuza emin olunuz !'
      );
    }
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe(
      (res) => {
        this.students = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          console.log(data);
          return data;
        });
      },
      (err) => {
        console.warn(`Hata meydana geldi : ${err}`);
      }
    );
  }

  addStudent(student: Student) {
    this.studentService.addStudent(student);
  }
  deleteStudent(student: Student) {
    if (
      window.confirm(
        `Öğrenciyi silmek istediğinize emin misiniz ?` + student.firstName
      )
    ) {
      this.studentService.deleteStudent(student);
    }
  }
}
