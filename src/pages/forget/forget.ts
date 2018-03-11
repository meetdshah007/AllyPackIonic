import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  forget: FormGroup;
  submited: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public services: ServicesProvider,
    public toastCtrl: ToastController
  ) {
    this.forget = formBuilder.group({
     email: ['', Validators.compose([Validators.required, Validators.email])]
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }


  doSubmit(){
    if (!this.forget.valid) {
      this.submited = true;
      return false;
    }
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: "New Password is send to Email Address."
    });
    toast.present();
    this.navCtrl.pop();
  }
}
