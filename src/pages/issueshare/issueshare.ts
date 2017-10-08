import {
  NavController
} from 'ionic-angular';

import { Component, OnInit } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Property } from '../../pages/property-shared/property';
import { PropertyService } from '../../providers/property.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { PropertyListPage } from '../../pages/property-list/property-list';
import { PricelistService } from '../../providers/pricelist.service';
import { Pricelist } from '../../pages/transaction-shared/pricelist';

@Component({
	selector: 'page-issueshare',
  templateUrl: 'issueshare.html'
  
  
})


export class IssueSharePage implements OnInit {

  // property: Property = new Property();
propertys: any [] = []; //FirebaseListObservable<Property[]>;

property: Property = new Property();
pricelist: Pricelist = new Pricelist();

showSpinner = true;

  constructor(private propertySvc: PropertyService,
  public navCtrl: NavController, 
  private pricelistserv: PricelistService
  ) {

  this.property.propertyid = UUID.UUID();;
  }

  ngOnInit() {
	  
	  

	
	/*
	  this.propertySvc.getPropertysList({ limitToLast: 5 }).subscribe(data=> {
		this.propertys = data;
	//	alert(JSON.stringify(this.consents));
	}); */
    // this.propertys.subscribe(() => this.showSpinner = false)
  }
   
		
  createProperty() {
	this.property.propertyimage =  "assets/img/house1.jpg";
	
	
    this.propertySvc.createProperty(this.property);
	this.createPricelist();
	
   // this.property = new Property() // reset property
	    this.navCtrl.push(PropertyListPage);
  }
  createPricelist() {
	
	this.pricelist.propertycode =  this.property.propertycode;
	this.pricelist.propertyid = this.property.propertyid;
    this.pricelistserv.createPricelist(this.pricelist);
	
    
	   
  }


}
