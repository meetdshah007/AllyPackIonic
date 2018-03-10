import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  public API_URL = 'http://localhost/';
  public options: any;
  private headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    this.options = new HttpHeaders(this.headers);
    console.log('Hello ServicesProvider Provider');
  }

  getUserData() {
    return this.storage.get('user');
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
}
