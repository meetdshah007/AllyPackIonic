import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';


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
  resetForm: FormGroup;
  uid:number;
  submited:boolean = false;
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value,
          isValid=control.root.value[field_name]==input;
      if(!isValid)
        return { 'equalTo': {isValid} }
      else
        return null;
    };
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public services: ServicesProvider
  ) {
    this.resetForm = formBuilder.group({
      oldpassword: ['', Validators.compose([Validators.required])],
      newpassword: ['', Validators.compose([Validators.required])],
      cpassword: ['', Validators.compose([Validators.required, this.equalto('newpassword')])]
    });
    services.getUserData().then((data:any )=>{
      this.uid = data.uid;
    });
  }

  doUpdate(){
    if (!this.resetForm.valid) {
      this.submited = true;
      return false;
    }

    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: "Password is changed successfully."
    });

    this.services.post(`resetpassword/${this.uid}`,this.resetForm.value).subscribe((res: any) => {
      if(res.status === "success"){ 
        toast.present();
        this.navCtrl.pop();
      }else{
        this.services.createWaring('Error',res.error);
      }
    }, (err) => {
      console.log("Error", err);
      const errMsg = err.message || 'Something is wrong with the network.';
      this.services.createWaring('Error', errMsg);
    });
  }
}
