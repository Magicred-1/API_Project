"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
class Ticket {
    constructor(id, type, price) {
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
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.class.js.map