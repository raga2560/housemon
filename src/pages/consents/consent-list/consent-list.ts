

import { Component, OnInit } from '@angular/core';
import { ConsentService } from '../shared/consent.service';
import { Consent } from '../shared/consent';
import { FirebaseListObservable } from 'angularfire2/database';





import {
  ActionSheet,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';



import { SessionDetailPage } from '../../session-detail/session-detail';
import { ConsentDetailPage } from '../consent-detail/consent-detail';

// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-consent-list',
  templateUrl: 'consent-list.html'
})
export class ConsentListPage  implements OnInit {
  actionSheet: ActionSheet;
  consents: any [] = [];// FirebaseListObservable<Consent[]>; //any[] = [];
  confData:  any[] = [];
 showSpinner = true;
 
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    
	public consentSvc: ConsentService,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
	  //this.consents = this.consentSvc.getConsentList({ limitToLast: 5 });
	  //this.consents.subscribe(() => this.showSpinner = false)
   // this.confData.getConsents().subscribe((speakers: any[]) => {
   //   this.consents = consents;
   // });
  }

  
  ngOnInit() {
    this.consentSvc.getConsentList({ limitToLast: 5 }).subscribe(data=> {
		this.consents = data;
	//	alert(JSON.stringify(this.consents));
	});
	
     //this.consents.subscribe(() => this.showSpinner = false)
	 //..alert(JSON.stringify(this.consents));
  }

  deleteItems() {
    this.consentSvc.deleteAll()
  }
  
  goToConsentDetail(consent: any) {
	  // alert(consent.data.consentid); 
	  //this.navCtrl.push(SessionDetailPage, { sessionId: 15 });
    this.navCtrl.push(ConsentDetailPage, { consentId: consent.data.consentid });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, { sessionId: session.id });
  }

  goToSpeakerDetail(speaker: any) {
    // this.navCtrl.push(SpeakerDetailPage, { speakerId: speaker.id });
  }

  goToSpeakerTwitter(speaker: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${speaker.twitter}`,
      '_blank'
    );
  }

  openSpeakerShare(speaker: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if ( (window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter
              );
            }
          }
        } as ActionSheetButton,
        {
          text: 'Share via ...'
        } as ActionSheetButton,
        {
          text: 'Cancel',
          role: 'cancel'
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        } as ActionSheetButton,
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }
}
