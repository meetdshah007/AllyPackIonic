import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OrdersPage } from '../orders/orders';

import { ServicesProvider } from '../../providers/services/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cartProducts: number = 0;
  constructor(
    public navCtrl: NavController,
    public services: ServicesProvider,
  ) {

  }

  ionViewDidLoad() {
    this.loadCartProductsCount();
    // this.updateDatabase();
  }

  loadCartProductsCount(){
    this.services.getCartData().then((products)=>{
      if(products){
        this.cartProducts = products.length || 0;
      }
    });
  }

  onSelectOrder(orderType){
    this.navCtrl.push(OrdersPage, orderType);
  }

  doOpenCart(){
    this.navCtrl.push('CartPage');
  }
}
