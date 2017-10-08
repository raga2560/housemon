import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Transaction } from '../pages/transaction-shared/transaction';

@Injectable()
export class TransactionService {

  private basePath = '/transactions';

  transactions: FirebaseListObservable<Transaction[]> ; //= null; //  list of objects
  transaction: FirebaseObjectObservable<Transaction> ; // = null; //   single object

  constructor(private db: AngularFireDatabase) { 
	this.transactions = this.db.list('/transactions', {
      query: {}
    });
  }


  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getTransactionsList(query = {}): FirebaseListObservable<Transaction[]> {
    this.transactions = this.db.list('/transactions', {
      query: query
    });
    return this.transactions
  }

  // Return a single observable transaction
  getTransaction(key: string): FirebaseObjectObservable<Transaction> {
    const transactionPath = `${this.basePath}/${key}`;
    this.transaction = this.db.object(transactionPath)
    return this.transaction
  }
  
  

  // Create a bramd new transaction
  createTransaction(transaction: Transaction): void {
    this.transactions.push(transaction)
      .catch(error => this.handleError(error))
  }


  // Update an exisiting transaction
  updateTransaction(key: string, value: any): void {
    this.transactions.update(key, value)
      .catch(error => this.handleError(error))
  }

  // Deletes a single transaction
  deleteTransaction(key: string): void {
    this.transactions.remove(key)
      .catch(error => this.handleError(error))
  }

  // Deletes the entire list of transactions
  deleteAll(): void {
    this.transactions.remove()
      .catch(error => this.handleError(error))
  }


  // Default error handling for all actions
  private handleError(error:any) {
    console.log(error)
  }


}
