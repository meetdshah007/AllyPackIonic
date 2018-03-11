import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  uid: Number;
  productData = [];
  products = [];
  myInput:string;

  constructor(
    public navCtrl: NavController,
    public services: ServicesProvider
  ) {
    this.products = this.productData;
    services.getUserData().then((data:any )=>{
      this.uid = data.uid;
      this.loadProducts();
    });
  }

  loadProducts(){
    this.myInput = '';
    this.services.post(`allproducts/${this.uid}`,{}).subscribe((res: any) => {
      if(res.status === "success"){
        this.productData = res.data;
        this.products = res.data;
      }else{
        this.services.createWaring('Error',res.error);
      }
    }, (err) => {
      console.log("Error", err);
      const errMsg = err.message || 'Something is wrong with the network.';
      this.services.createWaring('Error', errMsg);
    });
  }

  ionViewWillEnter(){
    if(this.uid) this.loadProducts();
  }

  onInput(event){
    this.products = this.productData.filter(item=>{
      let name = item.pname || '',
          desc = item.pdesc || '',
          val = this.myInput.toLowerCase();
      name = name.toLowerCase();
      desc = desc.toLowerCase();
      if((name.indexOf(val) >= 0) || desc.indexOf(val) >= 0){
        return item;
      }
    });
  }

  onSelectProduct(product){
    this.navCtrl.push('ProductDetailPage', product);
  }

  buyProduct(product){
    this.navCtrl.push('PlaceOrderPage', product);
  }

}
