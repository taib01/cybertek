export interface IAdmin {
token:string ; 
}
export class Admin implements IAdmin{
    token: string=localStorage.getItem("token-admin") ;  
}