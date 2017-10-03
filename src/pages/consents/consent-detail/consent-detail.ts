import { Component, OnInit } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConsentService } from '../shared/consent.service';
import { Consent } from '../shared/consent';
// import { ConferenceData } from '../../providers/conference-data';

@IonicPage({
	 name: 'ConsentDetailPage',
  segment: 'consent/:consentId'
})
@Component({
  selector: 'page-consent-detail',
  templateUrl: 'consent-detail.html'
})
export class ConsentDetailPage  implements OnInit{
  consent: any;
  vm: any;
  
  constructor(public consentSvc: ConsentService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
  }  	
	ngOnInit() {
		alert(this.navParams.data.consentId);
	   this.consentSvc.getConsent(this.navParams.data.consentId).subscribe(data=> {
		this.consent = data;
			this.vm = data.data;
		alert(JSON.stringify(this.consent));
	});

	}
	
/*    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.speakers) {
        for (const consent of data.consents) {
          if (consent && consent.id === this.navParams.data.consentId) {
            this.consent = consent;
            break;
          }
        }
      }
    });
*/
  

  goToSessionDetail(session: any) {
    this.navCtrl.push('SessionDetailPage', { sessionId: session.id });
  }
}
