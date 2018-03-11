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
  uid: number;
  orders: object = {
    "noOfUrgentOrders": 0,
    "noOfOpenOrder": 0,
    "noOfDispatchedOrder": 0,
    "noOfCompleted": 0,
    "noOfOpenComplaints": 0,
    "noOfAwaitingPayment": 0,
    "noOfDispatched": 0
  }

  constructor(
    public navCtrl: NavController,
    public services: ServicesProvider,
  ) {
    services.getUserData().then((data:any )=>{
      this.uid = data.uid;
      this.loadOrdersStatus();
    });
  }

  ionViewWillEnter(){
    this.loadCartProductsCount();
    if(this.uid) this.loadOrdersStatus();
  }

  loadOrdersStatus(){
    this.services.post(`dashboard/${this.uid}`,{}).subscribe((res: any) => {
      if(res.status === "success"){ 
        this.orders = res.data;
      }else{
        this.services.createWaring('Error',res.error);
      }
    }, (err) => {
      console.log("Error", err);
      const errMsg = err.message || 'Something is wrong with the network.';
      this.services.createWaring('Error', errMsg);
    });
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
