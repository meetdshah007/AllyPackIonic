import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    console.log('Hello ServicesProvider Provider');
  }

  getUserData(){
    return this.storage.get('user');
  }

  setLogged(){
    return this.storage.set('isLoggedIn', true);
  }

  getLogged(){
    return this.storage.get('isLoggedIn');
  }

  setCartData(products:object[]){
    return this.storage.set('cartData', products);
  }

  getCartData(){
    return this.storage.get("cartData");
  }
}
