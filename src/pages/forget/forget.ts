import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ServicesProvider } from '../../providers/services/services';
/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public services: ServicesProvider,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }


  doSubmit(){
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: "New Password is send to Email Address."
    });
    toast.present();
    this.navCtrl.pop();
  }
}
