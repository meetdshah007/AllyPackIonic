import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

  doUpdate(){
    console.log("=== Update the details ===>");
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: "Password is changed successfully."
    });
    toast.present();
    this.navCtrl.pop();
  }
}
