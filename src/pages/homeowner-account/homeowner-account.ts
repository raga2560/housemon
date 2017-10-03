import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@IonicPage({
  segment: 'homeowneraccount'
})
// segment: 'homeowneraccount/:homeowneraccountId'
@Component({
  selector: 'page-homeowner-account',
  templateUrl: 'homeowner-account.html'
})
export class HomeOwnerAccountPage {
 homeowneraccount: any;
  
  

  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams
  ) {
	  
	  this.homeowneraccount = {incomefromtrade: 150, sharesissued :10000, shareswithowner: 5000000, shareslocked: 200000, valueofshares:5000, nooftrades:300};
  }

  ionViewWillEnter() {
	  
	  	  this.homeowneraccount = {incomefromtrade: 150, sharesissued :10000, shareswithowner: 5000000, shareslocked: 200000, valueofshares:5000, nooftrades:300};
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
