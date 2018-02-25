import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  doUpdate(){
    console.log("=== Update the details ===>");
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: "User details updated successfully."
    });
    toast.present();
    // this.navCtrl.pop();
  }

  goToPage(pageName){
    this.navCtrl.push(pageName);
  }
}
