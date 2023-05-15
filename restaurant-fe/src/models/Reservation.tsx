import { Restaurant } from "./Restaurant";
import { Customer } from "./Customer";
export interface Reservation {
	id?: number;
	customer_id: number | undefined;
    restaurant_id:number  | undefined ;
	date: Date;
	number_of_persons: number;
	type : string;
	customer_name: string;
	restaurant_name: string;
	
}

