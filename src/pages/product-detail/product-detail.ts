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
  private productDetails: object = {
    pimage:''
  };
  productImage: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public services: ServicesProvider,
    public toastCtrl: ToastController
  ) {
    this.productDetails = navParams.data;
    let imagePath = this.services.getImageUrl();
    if(this.navParams.data['pimage'] && this.navParams.data['pimage'].indexOf(imagePath) == -1){  
      this.productDetails['pimage'] = `${imagePath}${this.navParams.data['pimage']}`;
    }
  }

  addToCart(){
    this.services.getCartData().then(data =>{
      if(!data) data = [this.productDetails];
      else data.push(this.productDetails);
      this.services.setCartData(data).then(()=>this.showToast("Product added to cart"));
    });
  }

  buyProduct(){
    this.navCtrl.push('PlaceOrderPage', JSON.parse(JSON.stringify(this.productDetails)));
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

  onImageLoadError(event){
    event.target.src = 'assets/imgs/product.jpg';
  }
}
