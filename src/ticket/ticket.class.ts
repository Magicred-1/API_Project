export class Ticket {
    id: number;
    type: string;
    price: number;
    isValid: boolean;

    constructor(id: number, type: string, price: number) {
        this.id = id;
        this.type = type;
        this.price = price;
        this.isValid = false;
    }

    validateTicket() {
        this.isValid = true;
    }

    invalidateTicket() {
        this.isValid = false;
    }

    getTicketPrice() {
        return this.price;
    }

    getTicketType() {
        return this.type;
    }
}