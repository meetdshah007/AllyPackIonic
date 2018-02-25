import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ForgetPage } from '../forget/forget';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public services: ServicesProvider
  ) {
    this.services.getLogged().then((res)=>{
      if(res) this.navCtrl.setRoot(TabsPage); 
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToPage(pageName){
    this.navCtrl.push(pageName);
  }

  doLogin(){
    this.services.setLogged().then((succ)=>{
      this.navCtrl.setRoot(TabsPage);
    })
  }

}
