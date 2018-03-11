import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  login: FormGroup;
  submited: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,    
    public services: ServicesProvider
  ) {
    this.services.getLogged().then((res)=>{
      if(res) this.navCtrl.setRoot(TabsPage); 
    });

    this.login = formBuilder.group({
      mobile: [null, Validators.compose([Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(10)])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToPage(pageName){
    this.navCtrl.push(pageName);
  }

  doLogin(){
    if (!this.login.valid) {
      this.submited = true;
      return false;
    }
    this.services.post('login/',this.login.value).subscribe((res: any) => {
      if(res.status === "success"){ 
        this.services.setLogged().then((succ)=>{
          this.services.setUserData(res.data).then(()=>this.navCtrl.setRoot(TabsPage));
        });
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
