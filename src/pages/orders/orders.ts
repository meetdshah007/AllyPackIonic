import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  activeFilter: String = "active";
  onlyDetail: Boolean = false;
  title: String = "Orders";
  orders: Object[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    if(navParams && navParams.data && navParams.data.length){
      this.activeFilter = navParams.data;
      this.onlyDetail = true;
      this.title = navParams.data + " Orders";
    }else{
      this.activeFilter = "Active";
      this.onlyDetail = false;
      this.title = "Orders";
    }
  }

  ionViewDidLoad() {
    this.generateData();
  }

  generateData(){
    this.orders = [{
      name: 'Product Name1',
      amount: 600,
      date: new Date(),
      orderNumber: 87987,
      status: this.activeFilter
    },{
      name: 'Product Name3',
      amount: 600,
      date: new Date(),
      orderNumber: 87987,
      status: this.activeFilter
    },{
      name: 'Product Name2',
      amount: 6100,
      date: new Date(),
      orderNumber: 87987,
      status: this.activeFilter
    },{
      name: 'Product Name4',
      amount: 6000,
      date: new Date(),
      orderNumber: 87987,
      status: this.activeFilter
    },{
      name: 'Product Name5',
      amount: 6200,
      date: new Date(),
      orderNumber: 87987,
      status: this.activeFilter
    }];
  }

  onFilterChange(){
    this.generateData();
  }

  onOrderSelect(orderDetail){
    console.log("== Selected Order===>", orderDetail);
  }
}
