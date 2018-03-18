import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registration: FormGroup;
  submited: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private services: ServicesProvider
  ) {
    this.registration = formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      company: ['', Validators.compose([Validators.required])],
      permanent_address: ['', Validators.compose([Validators.required])],
      contact_number: [null, Validators.compose([Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister(){
    if (!this.registration.valid) {
      this.submited = true;
      return false;
    }
    this.registration.value['lastname'] = this.registration.value.firstname.split(' ')[1] || '';
    this.registration.value['firstname'] = this.registration.value.firstname.split(' ')[0];
    this.services.post('registration/',this.registration.value).subscribe((res: any) => {
      if(res.status === "success"){
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
      message: "Your account is successfully register. Login now to continue"
    });
    toast.present();
    this.navCtrl.pop();
  }

}
