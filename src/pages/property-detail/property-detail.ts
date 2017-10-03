import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Property } from '../../pages/property-shared/property';
import { PropertyService } from '../../providers/property.service';

import { ConferenceData } from '../../providers/conference-data';


@IonicPage({
  segment: 'property/:propertyId'
})
@Component({
  selector: 'page-property-detail',
  templateUrl: 'property-detail.html'
})
export class PropertyDetailPage implements OnInit {
  propertydetail: any;

  constructor(private propertySvc: PropertyService, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ngOnInit() {
		//alert(this.navParams.data.consentId);
	 /*  this.propertySvc.getPropertyBypropertyId(this.navParams.data.propertyId).subscribe(data=> {
		this.property = data;
			//this.vm = data.data;
		//alert(JSON.stringify(this.consent));
	});
	*/
	 this.propertySvc.getPropertysList({ limitToFirst: 1, orderByChild: 'propertyid',
    equalTo: this.navParams.data.propertyId  }).subscribe(data=> {
		this.propertydetail = data[0];
		 alert(JSON.stringify(this.propertydetail));
	});
	

	}
	

  ionViewWillEnter() {
  /*  this.dataProvider.load().subscribe((data: any) => {
      if (data && data.propertys) {
        for (const property of data.propertys) {
          if (property && property.id === this.navParams.data.propertyId) {
            this.property = property;
            break;
          }
        }
      }
    });
*/
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push('SessionDetailPage', { sessionId: session.id });
  }
}
