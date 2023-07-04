export interface Order {
    id: string;
    name: string;
    number: string;
    tod: number;
    top: number;
    bot: number;
    sum: number;
    color: string;
}

export interface NewOrder {
    id: string;
    name: string;
    number: string;
    price: number;
    setType: string;
}

export interface SummaryOrder {
    id: string;
    name: string;
    number: string;
    tod: number;
    top: number;
    bot: number;
    sum: number;
    isPaid: boolean;
}


export interface ColorProfile {
    name: string;
    color: string
}
