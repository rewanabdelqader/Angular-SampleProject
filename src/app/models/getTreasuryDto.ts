import { baseDto } from "./baseDto";

export interface getTreasuryDto{
    id : number;
    name: string ;
    code:number;
    currency: baseDto;
}