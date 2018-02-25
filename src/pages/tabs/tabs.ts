import { Component } from '@angular/core';

import { OrdersPage } from '../orders/orders';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OrdersPage;
  tab3Root = SearchPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
