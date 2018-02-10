import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  signupForm:FormGroup
  constructor(public authprovider: AuthProvider,public fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.signupForm = this.fb.group({
      userName: [null, Validators.required],
      userEmail: [null, Validators.required],
      userPassword: [null, Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
 
  register() {
    this.authprovider.signup(this.signupForm.value)
    .then((success) => {
      this.navCtrl.push(LoginPage)
    }) .catch((err) => {
        console.log(err)
    })
  }

  login() {
    this.navCtrl.push(LoginPage)
  }

}
