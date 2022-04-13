import { BasketService } from "src/app/basket/basket.service";

export interface IBsaket {
    id: number;
    items: IBasketItem[];
}

export interface IBasketItem {
    id: number;
    idProduct:number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Basket implements IBsaket{
    id : number  ;
    items: IBasketItem[] = [] ;
}

export interface IBasketTotals {
    shipping : number ; 
    subtotat : number ; 
    total : number ; 
}




