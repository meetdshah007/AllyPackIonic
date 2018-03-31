import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  uid: string;
  orderId: string;
  order: object;
  products: object[] = [];
  subTotal: number = 0;
  taxCharges: number = this.subTotal * 0.05;
  shippingCharges: number = 20;
  grandTotal: number = this.subTotal + this.shippingCharges + this.taxCharges;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public services: ServicesProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  ionViewWillEnter(){
    console.log("== Order detail params===>", this.navParams);
    if(this.navParams && this.navParams.data){
      this.orderId = this.navParams.data.oid;
      this.services.getUserData().then((data:any )=>{
        this.uid = data.uid;
        this.getOrderDetail();
      });
    }
  }

  getOrderDetail(){
    this.services.post(`orderdetail/${this.uid}/${this.orderId}`,{}).subscribe((res: any) => {
      if(res.status === "success"){ 
        console.log("== Oderdetail Succeed ===>",res);
        this.order = res.data.details;
        this.products = res.data.products || [];

        this.subTotal = 0;
        this.products.map((product: any)=>{
          this.subTotal += product.rate * product.qty;
        });

        this.taxCharges = this.subTotal * 0.05;
        this.grandTotal = this.subTotal + this.shippingCharges + this.taxCharges;
      }else{
        this.services.createWaring('Error',res.error);
      }
    });
  }

  onImageLoadError(event){
    event.target.src = 'assets/imgs/product.jpg';
  }
}
