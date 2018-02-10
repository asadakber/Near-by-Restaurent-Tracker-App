import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthProvider {

  constructor(public afauth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  signup(signupData) {
    return this.afauth.auth.createUserWithEmailAndPassword(signupData.userEmail, signupData.userPassword)
  }

  signin(siginData) {
    return this.afauth.auth.signInWithEmailAndPassword(siginData.userEmail, siginData.userPassword)
  }

  signout() {
    return this.afauth.auth.signOut()
  }

}
