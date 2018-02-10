import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AboutPage } from '../../pages/about/about';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../../pages/login/login';
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public authprovider: AuthProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  logout() {
    this.authprovider.signout()
    this.navCtrl.push(LoginPage)
  }

  Map() {
    this.navCtrl.push(HomePage)
  }

  restaurent() {
    this.navCtrl.push(AboutPage)
  }

}
