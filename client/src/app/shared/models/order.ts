import { IBsaket } from "./basket";

export interface IOrder {
    basketId: number;
    shippingPrice: number;
    date: string;
}
export class Order {
    basketId: number;
    shippingPrice: number;
    date: string;
    total: number;
}
export interface IOrderDis {
    id: number;
    idClient: string;
    customerBasket: IBsaket;
    customerBasketId: number;
    shippingPrice: number;
    date: string;
    total: number;
    nameClient: string;
    adressClient: string;
    numeroClient: string;
    state:string;
}