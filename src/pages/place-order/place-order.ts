import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ServicesProvider } from '../../providers/services/services';

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
  product: object ={
    pimage: ''
  };
  subTotal: number = 0;
  shippingCharges: number = 20;
  taxCharges: number = this.subTotal * 0.05;
  grandTotal: number = this.subTotal + this.shippingCharges + this.taxCharges;
  user: object = {
    uaddress: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public services: ServicesProvider
  ) {
    services.getUserData().then((data:any )=>{
      this.user = data;
    });
    this.product = JSON.parse(JSON.stringify(navParams.data));
    let imagePath = this.services.getImageUrl();
    this.product['qty'] = 1;

    if(navParams.data['pimage'] && navParams.data['pimage'].indexOf(imagePath) == -1){
      this.product['pimage'] = `${imagePath}${navParams.data['pimage']}`;
    }
    this.calcTotal();
  }

  calcTotal(){    
    this.subTotal = this.product['prate'] * this.product['qty'];
    this.taxCharges = this.subTotal * 0.05;
    this.grandTotal = this.subTotal + this.shippingCharges + this.taxCharges;
  }

  runQtyChange(ev: any){
    this.calcTotal();
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

  onImageLoadError(event){
    event.target.src = 'assets/imgs/product.jpg';
  }

  changeAddress(){
    const scope= this,
      inputCallBack = (data, scope)=>{
        let msg =  'This action will update your permanent Address? Do you really want to save this address!',
          title = 'Use this address Always?';
        this.services.presentConfirm(title, msg, confirmCallBack);
        this.user['uaddress'] = data.address;
      },
      confirmCallBack = ()=>{
        this.updatePermanentAddress();
      },
      inputs = [{
        name: 'address',
        label: 'Address?',
        placeholder: '(Shipment Address)'
      }];
    this.services.alertWithInput('Shipment Address', inputs, 'Update', inputCallBack, scope);
  }

  updatePermanentAddress(){
    let userDetail = JSON.parse(JSON.stringify(this.user));

    userDetail['lastname'] = userDetail['firstname'].split(' ')[1] || '';
    userDetail['firstname'] = userDetail['firstname'].split(' ')[0];
    userDetail['email'] = userDetail['uemail'];
    userDetail['contact_number'] = userDetail['umobile'];
    userDetail['permanent_address'] = userDetail['uaddress'];

    this.services.post(`updatedetails/${this.user['uid']}`,userDetail).subscribe((res: any) => {
      this.user['uaddress'] =  userDetail['permanent_address'];
      if(res.status === "success"){
        this.services.setUserData(this.user);
      }else{
        this.services.createWaring('Error',res.error);
      }
    }, (err) => {
      console.log("Error", err);
      const errMsg = err.message || 'Something is wrong with the network.';
      this.services.createWaring('Error', errMsg);
    });
  }
}
