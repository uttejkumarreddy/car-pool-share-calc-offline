export interface transport {
    transportid: number;
    transportname: string;
    costperkm: number;
}

export interface addTransportInterface {
    name: string;
    costPerKm: number;
}