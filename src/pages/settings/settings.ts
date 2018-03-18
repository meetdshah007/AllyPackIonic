import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


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
  uid:Number;
  userData: object = {
    firstname: '',
    company: '',
    uaddress: ''
  };
  userDetail: FormGroup;
  submited: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public services: ServicesProvider
  ) {
    this.userDetail = formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      company: ['', Validators.compose([Validators.required])],
      uaddress: ['', Validators.compose([Validators.required])]
    });
    services.getUserData().then((data:any )=>{
      this.uid = data.uid;
      this.userData = data;
      this.userData['firstname'] = data.ufirst_name + " " + data.ulast_name;
    });
  }

  doUpdate(){
    if (!this.userDetail.valid) {
      this.submited = true;
      return false;
    }

    this.userDetail.value['lastname'] = this.userDetail.value.firstname.split(' ')[1] || '';
    this.userDetail.value['firstname'] = this.userDetail.value.firstname.split(' ')[0];

    this.userDetail.value['email'] = this.userData['uemail'];
    this.userDetail.value['contact_number'] = this.userData['umobile'];
    this.userDetail.value['permanent_address'] = this.userData['uaddress'];

    this.services.post(`updatedetails/${this.uid}`,this.userDetail.value).subscribe((res: any) => {
      this.userData['ulast_name'] = this.userDetail.value['lastname'];
      this.userData['ufirst_name'] = this.userDetail.value['firstname'];
      this.userData['uaddress'] = this.userDetail.value['permanent_address'];
      if(res.status === "success"){
        this.services.setUserData(this.userData);
        this.presentToast();
      }else{
        this.services.createWaring('Error',res.error);
      }
    }, (err) => {
      console.log("Error", err);
      const errMsg = err.message || 'Something is wrong with the network.';
      this.services.createWaring('Error', errMsg);
    });
  }

  presentToast(){
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: "User details updated successfully."
    });
    toast.present();
  }

  goToPage(pageName){
    this.navCtrl.push(pageName);
  }
}
