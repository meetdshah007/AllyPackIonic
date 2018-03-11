import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ServicesProvider } from '../../providers/services/services';

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
  private apiUrl:string = "addfeedback";
  private datakey:string = "feedback";
  private uid: number;
  private reason: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public service: ServicesProvider
  ) {
    if(!navParams.data.isFeedback) {
      this.pageType = "Complaint";
      this.apiUrl = "addcomplaint";
      this.datakey = "complaint";
    };
    this.product = navParams.data;
    service.getUserData().then(data=>this.uid = data.uid);
  }

  doUpdate() {
    if(!this.reason){
      this.service.createWaring("Error", "You must provide reason.");
      return false;
    }
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: `Your ${this.pageType} is submitted successfully. Thank you.`
    }),
    data = {
      [this.datakey]: this.reason 
    };
    console.log("post data ---->", data);

    this.service.post(`${this.apiUrl}/${this.uid}/${this.product['pid']}`, data).subscribe((res: any) => {
      if(res.status === "success"){ 
        toast.present();
        this.navCtrl.setRoot(SearchPage); 
      }else{
        this.service.createWaring('Error',res.error);
      }
    }, (err) => {
      console.log("Error", err);
      const errMsg = err.message || 'Something is wrong with the network.';
      this.service.createWaring('Error', errMsg);
    });
  }
}
