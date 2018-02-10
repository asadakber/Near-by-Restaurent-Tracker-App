import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { TabsPage } from '../../pages/tabs/tabs';
import { DashboardPage } from '../../pages/dashboard/dashboard';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup
  constructor(public fb: FormBuilder,public authprovider: AuthProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.loginForm = this.fb.group({
      userEmail: [null, Validators.required],
      userPassword: [null, Validators.required]
    })
  }

  ionViewDidLoad() {
    
  }

  login() {
    this.authprovider.signin(this.loginForm.value)
    .then((success) => {
      this.navCtrl.push(TabsPage)
    }) .catch((err) => {
        console.log(err)
    })
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }
 

}
