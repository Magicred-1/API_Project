import supabaseDB from "../../utils/supabase/supabaseClient";

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

    // CRUD methods
    // GET /tickets
    async fetchTickets() {
        const { data: tickets, error } = await supabaseDB.supabase
            .from('tickets')
            .select('*')

        if (error) {
            console.error(error);
        } else {
            return tickets;
        }
    }

    // GET /tickets/:id
    async fetchTicketById(id: number) {
        const { data: ticket, error } = await supabaseDB.supabase
            .from('tickets')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(error);
        }
        return ticket;
    }

    // POST /tickets/create
    async createTicket(type: string, price: number, isValid: boolean) {
        let valid = false;

        if (isValid) {
            valid = true;
        }

        const { data: ticket, error } = await supabaseDB.supabase
        .from("tickets")
        .insert([{ type, price, valid }])
        .single();

        if (error) {
            console.error(error);
        }
        return ticket;
    }

    // PUT /tickets/:id
    async updateTicket(id: number, type?: string, price?: number, isValid?: boolean) {
        let valid = false;

        if (isValid) {
            valid = true;
        }

        const { data: ticket, error } = await supabaseDB.supabase
        .from("tickets")
        .update({ type, price, valid })
        .eq('id', id)
        .single();

        if (error) {
            console.error(error);
        }
        return ticket;
    }

    // DELETE /tickets/:id
    async deleteTicket(id: number) {
        const { data: ticket, error } = await supabaseDB.supabase
        .from("tickets")
        .delete()
        .eq('id', id)
        .single();

        if (error) {
            console.error(error);
        }
        return ticket;
    }
}