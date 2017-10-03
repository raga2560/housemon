import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Consent } from './consent';

@Injectable()
export class ConsentService {

  private basePath = '/consents';

  consents: FirebaseListObservable<Consent[]> ; //= null; //  list of objects
  consent: FirebaseObjectObservable<Consent> ; // = null; //   single object

  constructor(private db: AngularFireDatabase) { }


  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getConsentList(query = {}): FirebaseListObservable<Consent[]> {
    this.consents = this.db.list('/consents', {
      query: query
    });
    return this.consents
  }

  // Return a single observable consent
  getConsent(key: string): FirebaseObjectObservable<Consent> {
    const consentPath = `${this.basePath}/${key}`;
    this.consent = this.db.object(consentPath)
    return this.consent
  }

  // Create a bramd new consent
  createConsent(consent: Consent): void {
    this.consents.push(consent)
      .catch(error => this.handleError(error))
  }


  // Update an exisiting consent
  updateConsent(key: string, value: any): void {
    this.consents.update(key, value)
      .catch(error => this.handleError(error))
  }

  // Deletes a single consent
  deleteConsent(key: string): void {
    this.consents.remove(key)
      .catch(error => this.handleError(error))
  }

  // Deletes the entire list of consents
  deleteAll(): void {
    this.consents.remove()
      .catch(error => this.handleError(error))
  }


  // Default error handling for all actions
  private handleError(error:any) {
    console.log(error)
  }


}
