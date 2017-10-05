import { Component } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { IssueSharePage } from '../issueshare/issueshare';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { ItemsListComponent } from '../items/items-list/items-list.component'  ;
import { HomeOwnerAccountPage } from '../homeowner-account/homeowner-account';
import { ShareOwnerAccountPage } from '../shareowner-account/shareowner-account';
import { ConsentListPage } from '../consents/consent-list/consent-list'  ;
import { PropertyListPage } from '../property-list/property-list';
import { TradePanelPage } from '../tradepanel/tradepanel';




@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = PropertyListPage;
  tab3Root: any = HomeOwnerAccountPage;
  tab4Root: any = IssueSharePage;
  
  tab5Root: any = ShareOwnerAccountPage;
  tab6Root: any = TradePanelPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
