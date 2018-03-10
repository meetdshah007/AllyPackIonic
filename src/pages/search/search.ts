import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  productData = [{
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
  products = [];
  myInput:string;

  constructor(public navCtrl: NavController) {
    this.products = this.productData;
  }

  onInput(event){
    this.products = this.productData.filter(item=>{
      let name = item.name || '',
          desc = item.description || '',
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
    console.log("== Redirection to Place Order page ===>", product);
  }

}
