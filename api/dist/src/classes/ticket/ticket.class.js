"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const supabaseClient_1 = __importDefault(require("../../utils/supabase/supabaseClient"));
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
    // CRUD methods
    // GET /tickets
    fetchTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: tickets, error } = yield supabaseClient_1.default.supabase
                .from('tickets')
                .select('*');
            if (error) {
                console.error(error);
            }
            else {
                return tickets;
            }
        });
    }
    // GET /tickets/:id
    fetchTicketById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: ticket, error } = yield supabaseClient_1.default.supabase
                .from('tickets')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
            }
            return ticket;
        });
    }
    // POST /tickets/create
    createTicket(type, price, isValid) {
        return __awaiter(this, void 0, void 0, function* () {
            let valid = false;
            if (isValid) {
                valid = true;
            }
            const { data: ticket, error } = yield supabaseClient_1.default.supabase
                .from("tickets")
                .insert([{ type, price, valid }])
                .single();
            if (error) {
                console.error(error);
            }
            return ticket;
        });
    }
    // PUT /tickets/:id
    updateTicket(id, type, price, isValid) {
        return __awaiter(this, void 0, void 0, function* () {
            let valid = false;
            if (isValid) {
                valid = true;
            }
            const { data: ticket, error } = yield supabaseClient_1.default.supabase
                .from("tickets")
                .update({ type, price, valid })
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
            }
            return ticket;
        });
    }
    // DELETE /tickets/:id
    deleteTicket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: ticket, error } = yield supabaseClient_1.default.supabase
                .from("tickets")
                .delete()
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
            }
            return ticket;
        });
    }
}
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.class.js.map