import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  public BASE_URL = `http://viewurdemo.com/api_allypack_app/`;
  public API_URL = `${this.BASE_URL}mobileapi/`;
  public IMAGE_URL = `${this.BASE_URL}images/prodimages/`;
  public options: any;
  private headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods":'POST, GET, OPTIONS, PUT'
  }

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public storage: Storage,
    public alertCtrl: AlertController    
  ) {
    this.options = new HttpHeaders(this.headers);
    console.log('Hello ServicesProvider Provider');
  }

  createWaring(title: string, message: string) {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['Dismiss']
    });
    alert.present();
  }

  getUserData() {
    return this.storage.get('user');
  }

  getImageUrl(){
    return this.IMAGE_URL;
  }

  setUserData(data:any){
    return this.storage.set('user', data);
  }

  setLogged() {
    return this.storage.set('isLoggedIn', true);
  }

  getLogged() {
    return this.storage.get('isLoggedIn');
  }

  setCartData(products: object[]) {
    return this.storage.set('cartData', products);
  }

  getCartData() {
    return this.storage.get("cartData");
  }

  /**
   * API handling
   * @param url 
   * @param data 
   */
  post(url: string, data: object) {
    return this.http.post(this.API_URL + url, data, this.options);

  }
  get(url: string) {
    return this.http.get(this.API_URL + url, this.options);

  }
  delete(url: string) {
    return this.http.delete(this.API_URL + url, this.options);

  }
  put(url: string, data: object) {
    return this.http.put(this.API_URL + url, data, this.options);

  }
  /** API Handling */

  alertWithInput(title, inputs, btnText, action, scope) {
    let alert = this.alertCtrl.create({
        title: title,
        inputs: inputs || [],
        buttons: [{
            text: 'Cancel',
            role: 'cancel',
            handler: data => {}
          }, {
            text: btnText,
            handler: data => {
              action(data, scope);
            }
          }]
        });

        alert.present();
        return false;
  }

  presentConfirm(title, message, action){
    let alert = this.alertCtrl.create({
      title: title,
      message: message || '',
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {}
        }, {
          text: 'Confirm',
          handler: data => {
            action();
          }
        }]
      });

      alert.present();
      return false;
  }
}
