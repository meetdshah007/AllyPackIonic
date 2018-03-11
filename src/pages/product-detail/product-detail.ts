import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  private productDetails: object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public services: ServicesProvider,
    public toastCtrl: ToastController
  ) {
    this.productDetails = navParams.data;
    this.productDetails={name: "Nestley Maggied", description: "Brand MAGGI has started “Simply Good” initiative, in line with Nestlé’s global commitment.", price: 40, qty: 1, imgUrl: "assets/imgs/maggie.jpg"};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  addToCart(){
    this.services.getCartData().then(data =>{
      if(!data) data = [this.productDetails];
      else data.push(this.productDetails);
      this.services.setCartData(data).then(()=>this.showToast("Product added to cart"));
    });
  }

  buyProduct(){
    console.log("== Redirection to Place Order page ===>", this.productDetails);
    this.navCtrl.push('PlaceOrderPage', this.productDetails);
  }

  showToast(msg:string){
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: msg
    });
    toast.present();
    this.navCtrl.pop();
  }

  goFeedBack(isFeedback){
    this.productDetails['isFeedback'] = isFeedback;
    this.navCtrl.push('FeedbackPage',this.productDetails);
  }
}
