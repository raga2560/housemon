import { Component , OnInit} from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { SlicePipe } from '@angular/common';
import { AuthService } from '../../providers/auth.service';
import { Property } from '../../pages/property-shared/property';
import { Pricelist } from '../../pages/transaction-shared/pricelist';
import { PricelistService } from '../../providers/pricelist.service';
import { Transaction } from '../../pages/transaction-shared/transaction';
import { TransactionService } from '../../providers/transaction.service';
import { ConferenceData } from '../../providers/conference-data';
import { UUID } from 'angular2-uuid';

@IonicPage({

  segment: 'tradepanel/:propertyId'
})

@Component({
  selector: 'tradepanel',
  templateUrl: 'tradepanel.html'
})

// https://angular.io/api/common/SlicePipe  Used in HTML

export class TradePanelPage implements OnInit {
 homeowneraccount: any;
  buyingprice: any [];
  sellingprice: any [];
  propertyid: string;
  propertycode: string;
  property : Property;
  pricelist : Pricelist;
  newprice : any;
  transaction: Transaction;
  processtrnxs : any [];
  
  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams,
	public auth: AuthService,
	public pricelistservice: PricelistService,
	public transactionservice: TransactionService
  ) {
	  
	//  this.buyingprice = [1500, 1400, 1430];
	//  this.sellingprice = [1600, 1560, 1700];
	this.newprice = {
		buyingprice:'',
		sellingprice: '',
		buyingnumber:'',
		sellingnumber: ''
	};
  }
  // Thanks to https://davidwalsh.name/array-sort
  ngOnInit() {
		
	 this.pricelistservice.getPricelistsList({ limitToFirst: 1, orderByChild: 'propertyid',
    equalTo: this.navParams.data.propertyId  }).subscribe(data=> { 
		this.pricelist = data[0];
		if(this.pricelist.sellerprices) {
			this.pricelist.sellerprices = this.pricelist.sellerprices.sort(function(obj1, obj2){
				return (obj1.price - obj2.price)
			});
		}
		if(this.pricelist.buyerprices)
		{
			this.pricelist.buyerprices = this.pricelist.buyerprices.sort(function(obj1, obj2){
				
				return (obj2.price - obj1.price)
			});
		}
		 // alert(JSON.stringify(this.pricelist));
	});
	
	
	this.transactionservice.getTransactionsList({ limitToFirst: 4, orderByChild: 'active', equalTo: true }).subscribe(data=> { 
		this.processtrnxs = data;
			
			this.processtrnxs.forEach((tran: any) => {
				
				tran.blockchaintransactionid = UUID.UUID();;
				
				// update users of shares transfered
				
				// this.transactionservice.updateTransaction(tran.$key, tran);
				
          
        });
		
		//  alert(JSON.stringify(this.processtrnxs));
	});
	

	}
	
	
	

  ionViewWillEnter() {
	  
	  //this.buyingprice = [1500, 1400, 1430];
	  //this.sellingprice = [1600, 1560, 1700];
	  
	  	 
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
  
  entersellprice() {
		
		if(this.pricelist.buyerprices && Number(this.newprice.sellingprice) <= Number(this.pricelist.buyerprices[0].price))
		{
			var matchedbuyer:any = this.pricelist.buyerprices.shift();  // shift is opposite of pop. shift removes first element
			
			this.pricelistservice.updatePricelist(this.pricelist.$key, this.pricelist);
			
			this.transaction = new Transaction();
			this.transaction.seller = this.auth.currentUserId;
			this.transaction.buyer = matchedbuyer.userid;
			this.transaction.price = matchedbuyer.price;
			this.transaction.propertyid = this.pricelist.propertyid;
			
			this.transactionservice.createTransaction(this.transaction);
			
			// do transaction
		}else{
			// enter in pricelist
			let objtopush = {
			userid: this.auth.currentUserId,
			price: this.newprice.sellingprice
			};
			
			if(this.pricelist.sellerprices)
			{
			this.pricelist.sellerprices.push(objtopush);
			}
			else {
				this.pricelist.sellerprices = [];
				this.pricelist.sellerprices.push(objtopush);
			}
			this.pricelistservice.updatePricelist(this.pricelist.$key, this.pricelist);
			
		}
		
		this.newprice.sellingprice = '';
		this.newprice.sellingnumber = '';
		
  }

  enterbuyprice() {
		
		if(this.pricelist.sellerprices && Number(this.newprice.buyingprice) >= Number(this.pricelist.sellerprices[0].price))
		{
			
			var matchedseller:any = this.pricelist.sellerprices.shift();  // shift is opposite of pop. shift removes first element
			
			this.pricelistservice.updatePricelist(this.pricelist.$key, this.pricelist);
			
			this.transaction = new Transaction();
			this.transaction.buyer = this.auth.currentUserId;
			this.transaction.seller = matchedseller.userid;
			this.transaction.price = matchedseller.price;
			this.transaction.propertyid = this.pricelist.propertyid;
			
			this.transactionservice.createTransaction(this.transaction);
			
			
			// do transaction
		}else{
			// enter in pricelist
			let objtopush = {
			userid: this.auth.currentUserId,
			price: this.newprice.buyingprice
			};
			
			
			
			if(this.pricelist.buyerprices)
			{
			this.pricelist.buyerprices.push(objtopush);
			}
			else {
				this.pricelist.buyerprices = [];
				this.pricelist.buyerprices.push(objtopush);
			}
			
			this.pricelistservice.updatePricelist(this.pricelist.$key, this.pricelist);
		}
		
		this.newprice.buyingprice = '';
		this.newprice.buyingnumber = '';
		
  }

  
}
