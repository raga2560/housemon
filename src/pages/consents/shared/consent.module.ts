import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from '../../shared/shared.module';


import { ConsentService } from './consent.service';
import { ConsentListPage } from '../consent-list/consent-list';
//import { ConsentFormComponent } from '../consent-form/consent-form.component';
import { ConsentDetailPage } from '../consent-detail/consent-detail';

@NgModule({
  imports: [
	IonicModule.forRoot(ConsentListPage, {}, {
      links: [
        
	{ component: ConsentDetailPage, name: 'ConsentDetail', segment: 'consent/:consentId' }]}
		),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    ConsentListPage,
  //  ConsentFormComponent,
    ConsentDetailPage
  ],
  exports: [
    ConsentListPage,
  //  ConsentFormComponent,
    ConsentDetailPage
  ],
  
  providers: [
    ConsentService
  ],
  entryComponents: [
		ConsentListPage,
		ConsentDetailPage
		]
})

export class ConsentModule { }
