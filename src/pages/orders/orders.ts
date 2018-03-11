import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  uid: Number;
  activeFilter:string = "Open";
  filters:object = {
    'Open': 'Open',
    'Urgent': 'Urgent',
    'Dispatched': 'In Dispatch',
    'Payment Pending': 'Awaiting Payment',
    'Completed': 'Completed'
  };  
  onlyDetail: Boolean = false;
  title: String = "Orders";
  orders: Object[] = [];
  orderList: object[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public services: ServicesProvider
  ) {
    if(navParams && navParams.data && navParams.data.length){
      this.activeFilter = navParams.data;
      this.onlyDetail = true;
      this.title = navParams.data + " Orders";

    }else{
      this.activeFilter = "Open";
      this.onlyDetail = false;
      this.title = "Orders";
    }
    services.getUserData().then((data:any )=>{
      this.uid = data.uid;
      this.getOrders();
    });
  }

  ionViewWillEnter(){
    if(this.uid) this.getOrders();
  }

  getOrders() {
    this.services.post(`orders/${this.uid}`,{}).subscribe((res: any) => {
      if(res.status === "success"){ 
        this.orderList = res.data;
        this.onFilterChange();
      }else{
        this.services.createWaring('Error',res.error);
      }
    }, (err) => {
      console.log("Error", err);
      const errMsg = err.message || 'Something is wrong with the network.';
      this.services.createWaring('Error', errMsg);
    });
  }

  onFilterChange(){
    const activeKey = this.filters[this.activeFilter];
    console.log("=== AcitveKey ===>", activeKey, " === ActiveFilter ====>", this.activeFilter);
    this.orders = this.orderList.filter((order: any)=>{
      if(order.ostatus === activeKey)
        return order;
    });
  }

  onOrderSelect(orderDetail){
    console.log("== Selected Order===>", orderDetail);
  }
}
