import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Pricelist } from '../pages/transaction-shared/pricelist';





@Injectable()
export class PricelistService {

  private basePath = '/pricelists';

  pricelists: FirebaseListObservable<Pricelist[]> ; //= null; //  list of objects
  pricelist: FirebaseObjectObservable<Pricelist> ; // = null; //   single object
  

  constructor(private db: AngularFireDatabase ) { 
	  this.pricelists = this.db.list('/pricelists', {
      query: {}
    });
  }


  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getPricelistsList(query = {}): FirebaseListObservable<Pricelist[]> {
    this.pricelists = this.db.list('/pricelists', {
      query: query
    });
    return this.pricelists
  }

  // Return a single observable pricelist
  getPricelist(key: string): FirebaseObjectObservable<Pricelist> {
    const pricelistPath = `${this.basePath}/${key}`;
    this.pricelist = this.db.object(pricelistPath)
    return this.pricelist
  }
  
  

  // Create a bramd new pricelist
  createPricelist(pricelist: Pricelist): void {
    this.pricelists.push(pricelist)
      .catch(error => this.handleError(error))
  }


  
  
  // Update an exisiting pricelist
  updatePricelist(key: string, value: any): void {
    this.pricelists.update(key, value)
      .catch(error => this.handleError(error))
  }

  // Deletes a single pricelist
  deletePricelist(key: string): void {
    this.pricelists.remove(key)
      .catch(error => this.handleError(error))
  }

  // Deletes the entire list of pricelist
  deleteAll(): void {
    this.pricelists.remove()
      .catch(error => this.handleError(error))
  }


  // Default error handling for all actions
  private handleError(error:any) {
    console.log(error)
  }


}
