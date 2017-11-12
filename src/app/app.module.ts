import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule,IonicPageModule , IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { DirectivesModule } from '../directives/directives.module';

import { ConferenceApp } from './app.component';

import { IssueSharePage } from '../pages/issueshare/issueshare';
import { PopoverPage } from '../pages/issueshare-popover/issueshare-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { HomeOwnerAccountPage } from '../pages/homeowner-account/homeowner-account';
import { TradePanelPage } from '../pages/tradepanel/tradepanel';
import { ShareOwnerAccountPage } from '../pages/shareowner-account/shareowner-account';
import { SignupPage } from '../pages/signup/signup';
import { PropertyDetailPage } from '../pages/property-detail/property-detail';
import { PropertyListPage } from '../pages/property-list/property-list';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { ConsentService } from '../pages/consents/shared/consent.service';
import { ItemService } from '../pages/items/shared/item.service';
import { PropertyService } from '../providers/property.service';
import { PricelistService } from '../providers/pricelist.service';
import { TransactionService } from '../providers/transaction.service';
//import { Pricelist } from '../pages/transaction-shared/pricelist';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth.service';
import { BlockchainService } from '../providers/blockchain.service';
export const firebaseConfig = environment.firebaseConfig;

// Core
import { CoreModule } from '../pages/core/core.module';

// Shared/Widget
import { SharedModule } from '../pages/shared/shared.module'

import { ItemModule } from '../pages/items/shared/item.module';
import { ConsentModule } from '../pages/consents/shared/consent.module';


import { ConferenceData } from '../providers/conference-data';
import { ItemsListComponent } from '../pages/items/items-list/items-list.component'  ;
import { UserData } from '../providers/user-data';


@NgModule({
  declarations: [
    ConferenceApp,
    IssueSharePage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    PropertyDetailPage,
    PropertyListPage,
	HomeOwnerAccountPage,
	ShareOwnerAccountPage,
	TradePanelPage,
    TabsPage,
    TutorialPage,
//	ItemsListComponent,
	   SupportPage
	
  ],
  imports: [
    BrowserModule,
    HttpModule,
	ItemModule,
	ConsentModule,
	DirectivesModule,
	CoreModule,
	SharedModule,
//	IonicPageModule.forChild(ItemsListComponent),
	AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
		{ component: HomeOwnerAccountPage, name: 'HomeOwnerAccount', segment: 'homeowneraccount	' },
		{ component: TradePanelPage, name: 'TradePanel', segment: 'tradepanel' },
		{ component: ShareOwnerAccountPage, name: 'ShareOwnerAccount', segment: 'shareowneraccount' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: PropertyListPage, name: 'PropertyList', segment: 'propertyList' },
        { component: PropertyDetailPage, name: 'PropertyDetail', segment: 'propertyDetail/:propertyId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: IssueSharePage, name: 'About', segment: 'issueshare' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
//		{ component: ItemsListComponent, name: 'ItemsListComponent', segment: 'items' },
		
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
	IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    IssueSharePage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    PropertyDetailPage,
    PropertyListPage,
	HomeOwnerAccountPage,
	TradePanelPage,
	ShareOwnerAccountPage,
    TabsPage,
    TutorialPage,
//	ItemsListComponent,
    SupportPage
	  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
	ConsentService,
	ItemService,
	PropertyService,
	PricelistService,
	TransactionService,
	AuthService,
	BlockchainService,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
