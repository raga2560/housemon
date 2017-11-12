import { Component } from '@angular/core';
import { Property } from '../../pages/property-shared/property';
import { PropertyService } from '../../providers/property.service';
import { IonicPage, NavParams } from 'ionic-angular';

import {
  ActionSheet,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';
import { BlockchainService } from '../../providers/blockchain.service';

import { SessionDetailPage } from '../session-detail/session-detail';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { TradePanelPage } from '../tradepanel/tradepanel';


// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@IonicPage({

  segment: 'propertyList'
})



@Component({
  selector: 'page-property-list',
  templateUrl: 'property-list.html'
})
export class PropertyListPage {
  actionSheet: ActionSheet;
  propertys: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
	private propertySvc: PropertyService,
	public  bcservice: BlockchainService,
    public inAppBrowser: InAppBrowser
  ) {
	  bcservice.send("welcome");
	  
  }

  ionViewDidLoad() {
    this.propertySvc.getPropertysList().subscribe((propertys: any[]) => {
      this.propertys = propertys;
    });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, { sessionId: session.id });
  }

  goToPropertyDetail(property: any) {
	//  alert(JSON.stringify(property));
    this.navCtrl.push(PropertyDetailPage, { propertyId: property.propertyid });
  }
   goToTradePanel(property: any) {
	//  alert(JSON.stringify(property));
    this.navCtrl.push(TradePanelPage, { propertyId: property.propertyid });
  }


  goToPropertyTwitter(property: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${property.twitter}`,
      '_blank'
    );
  }

  openPropertyShare(property: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + property.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + property.twitter);
            if ( (window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy(
                'https://twitter.com/' + property.twitter
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

  openContact(property: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + property.name,
      buttons: [
        {
          text: `Email ( ${property.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + property.email);
          }
        } as ActionSheetButton,
        {
          text: `Call ( ${property.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + property.phone);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }
}
