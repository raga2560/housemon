import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Property } from '../pages/property-shared/property';


@Injectable()
export class PropertyService {

  private basePath = '/propertys';

  propertys: FirebaseListObservable<Property[]> ; //= null; //  list of objects
  property: FirebaseObjectObservable<Property> ; // = null; //   single object


  // Thanks to this link https://stackoverflow.com/questions/40293539/is-it-possible-to-reverse-a-firebase-list
  
  constructor(private db: AngularFireDatabase) { 
	this.propertys = this.db.list('/propertys', {
      query: {}
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
  }


  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getPropertysList(query = {}): FirebaseListObservable<Property[]> {
    this.propertys = this.db.list('/propertys', {
      query: query
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    return this.propertys
  }

  // Return a single observable property
  getProperty(key: string): FirebaseObjectObservable<Property> {
    const propertyPath = `${this.basePath}/${key}`;
    this.property = this.db.object(propertyPath)
    return this.property
  }
  
  

  // Create a bramd new property
  createProperty(property: Property): void {
    this.propertys.push(property)
      .catch(error => this.handleError(error))
  }



  // Update an exisiting property
  updateProperty(key: string, value: any): void {
    this.propertys.update(key, value)
      .catch(error => this.handleError(error))
  }

  // Deletes a single property
  deleteProperty(key: string): void {
    this.propertys.remove(key)
      .catch(error => this.handleError(error))
  }

  // Deletes the entire list of propertys
  deleteAll(): void {
    this.propertys.remove()
      .catch(error => this.handleError(error))
  }


  // Default error handling for all actions
  private handleError(error:any) {
    console.log(error)
  }


}
