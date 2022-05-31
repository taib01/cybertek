import { Adress, IAdress } from "./adress";

export interface IUser {
    email: string;
    displayName: string;
    token: string;
}
export interface IUser2 {
    email: string;
    displayName: string;
    token:string;
    adress : IAdress ;
    phoneNumber : string ; 
}
export class User2  {
    email: string;
    displayName: string;
    passowrd:string ;
    adress : IAdress ;
    phoneNumber : string ; 

}
