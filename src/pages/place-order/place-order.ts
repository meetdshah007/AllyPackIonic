import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SearchPage } from '../search/search';

/**
 * Generated class for the PlaceOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-order',
  templateUrl: 'place-order.html',
})
export class PlaceOrderPage {
  product: object;
  subTotal: number = 0;
  shippingCharges: number = 20;
  taxCharges: number = this.subTotal * 0.05;
  grandTotal: number = this.subTotal + this.shippingCharges + this.taxCharges;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    this.product = navParams.data;
    console.log("== Product ==>", this.product);
    this.calcTotal();
  }

  calcTotal(){    
    this.subTotal = this.product['price'] * this.product['qty'];
    this.taxCharges = this.subTotal * 0.05;
    this.grandTotal = this.subTotal + this.shippingCharges + this.taxCharges;
  }

  runQtyChange(ev: any){
    this.calcTotal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceOrderPage');
  }

  onOrderPlace(productDetail){
    console.log("== On Placing the order ==>", productDetail);
      let toast = this.toastCtrl.create({
        duration: 3000,
        position: 'bottom',
        message: "Your order is under process. We'll update the status once confirmed."
      });
      toast.present();
      this.navCtrl.setRoot(SearchPage);
  }

}
