import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SearchPage } from '../search/search';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  private pageType:string = "Feedback";
  private product:object;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController    
  ) {
    if(!navParams.data.isFeedback) this.pageType = "Complaint";
    this.product = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  doUpdate() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: `Your ${this.pageType} is submitted successfully. Thank you.`
    });
    toast.present();
    this.navCtrl.setRoot(SearchPage);
  }
}
