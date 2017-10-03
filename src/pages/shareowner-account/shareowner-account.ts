import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@IonicPage({
  segment: 'shareowneraccount'
})
// segment: 'shareowneraccount/:shareowneraccountId'
@Component({
  selector: 'page-shareowner-account',
  templateUrl: 'shareowner-account.html'
})
export class ShareOwnerAccountPage {
 shareowneraccount: any;
  
  

  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams
  ) {
	  
	  this.shareowneraccount = [{name: 'JAYA121SHARE', price: 1500, noofshares: 20}, {name: 'KORA1221SHARE', price: 3500, noofshares: 20}, {name: 'RTNAGAR1221SHARE', price: 3500, noofshares: 20}];
	  
	  
  }

  ionViewWillEnter() {
	  
	  	  this.shareowneraccount = [{name: 'JAYA121SHARE', price: 1500, noofshares: 20}, {name: 'KORA1221SHARE', price: 3500, noofshares: 20}, {name: 'RTANAGAR1221SHARE', price: 3500, noofshares: 20}];
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
