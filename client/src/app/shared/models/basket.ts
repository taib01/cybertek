export interface IBsaket {
    id: number;
    items: IBasketItem[];
}

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Basket implements IBsaket{
    id : number ;
    items: IBasketItem[] ;

}


