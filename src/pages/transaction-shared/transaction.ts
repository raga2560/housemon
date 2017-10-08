export class Transaction {
  $key: string;
  seller: string;
  buyer: string;
  price: number;
  numberofshares :number;
  blockchaintransactionid: string;
  propertyid:string;
  buyerupdated:string;
  sellerupdated: string;
  active = true;
  timeStamp: number;
}
