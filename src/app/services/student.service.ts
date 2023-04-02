import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Student } from '../models/student';


@Injectable({
  providedIn: 'root',
})

export class StudentService {
  constructor(private afs : AngularFirestore) {}
  addStudent(studentToAdd: Student) {
    studentToAdd.id = this.afs.createId();
    return this.afs.collection('/Students').add(studentToAdd);
  }

  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }

  deleteStudent(studentToDelete: Student) {
    return this.afs.doc(`/Students/${studentToDelete.id}`).delete();
  }

  updateStudent(student: Student) {
    this.deleteStudent(student);
    this.addStudent(student);
  }
}
