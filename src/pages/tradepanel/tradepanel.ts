import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@IonicPage({
  segment: 'tradepanel'
})
// segment: 'homeowneraccount/:homeowneraccountId'
@Component({
  selector: 'tradepanel',
  templateUrl: 'tradepanel.html'
})
export class TradePanelPage {
 homeowneraccount: any;
  buyingprice: any [];
  sellingprice: any [];

  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams
  ) {
	  
	  this.buyingprice = [1500, 1400, 1430];
	  this.sellingprice = [1600, 1560, 1700];
  }

  ionViewWillEnter() {
	  
	  this.buyingprice = [1500, 1400, 1430];
	  this.sellingprice = [1600, 1560, 1700];
	  
	  	 
    /* this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    }); */
  }
}
