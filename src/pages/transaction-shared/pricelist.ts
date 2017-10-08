export class Pricelist {
  $key: string;
  sellerprices: Array<{userid:string, price:number}>;
  buyerprices: Array<{userid:string, price:number}>;
  propertyid:string;
  propertycode:string;
  active = true;
  timeStamp: number;
}
