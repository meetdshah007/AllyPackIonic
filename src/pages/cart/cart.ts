import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  products: object[] = [];
  subTotal: number = 0;
  shippingCharges: number = 20;
  taxCharges: number = this.subTotal * 0.05;
  grandTotal: number = this.subTotal + this.shippingCharges + this.taxCharges;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public services: ServicesProvider,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.loadCartItems();
     //this.updateDatabase();
  }

  loadCartItems(){
    this.services.getCartData().then((products)=>{
      this.products = products || [];
      this.calcTotal();
    });
  }

  onAllOrderPlace(){
    console.log("== Requesting all order ===>",this.products);
    this.products = [];
    this.calcTotal();
    this.showToast();
  }

  calcTotal(){
    this.subTotal = 0;
    this.products.map((product: any)=>{
      this.subTotal += product.prate * product.qty;
    });

    this.taxCharges = this.subTotal * 0.05;
    this.grandTotal = this.subTotal + this.shippingCharges + this.taxCharges;
    this.updateDatabase(); //Save changes to database.  
  }

  runQtyChange(ev: any, product: any){
    this.calcTotal();
  }

  onSingleOrderRemove(productDetail: any){
    const index = this.products.findIndex((item: any)=>item.name === productDetail.name);
    if(index != -1) this.products.splice(index, 1);    
    this.calcTotal();
  }

  onSingleOrderPlace(productDetail){
    const index = this.products.findIndex((item: any)=>item.name === productDetail.name);
    if(index != -1) {
      this.products.splice(index, 1);
    }
    this.updateDatabase();
    console.log("== Book this Order ===>", productDetail);
    this.showToast();
  }

  updateDatabase(){
    this.services.setCartData(this.products);
    // this.services.setCartData(this.dummyData);
  }

  showToast(){
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: "Your order is under process. We'll update the status once confirmed."
    });
    toast.present();
    this.navCtrl.pop();
  }

  dummyData = [{
    name: "Nestley Maggied",
    description: 'Brand MAGGI has started “Simply Good” initiative, in line with Nestlé’s global commitment.',
    price: 40,
    qty: 1,
    imgUrl: 'assets/imgs/maggie.jpg'
  },{
    name: "Nestley Maggie",
    description: 'Brand MAGGI has started “Simply Good” initiative, in line with Nestlé’s global commitment.',
    price: 40,
    qty: 1,
    imgUrl: 'assets/imgs/maggie.jpg'
  }];
}
