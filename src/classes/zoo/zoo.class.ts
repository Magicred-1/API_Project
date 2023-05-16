import { Space } from '../../index';
import { Animal } from '../../index';
import { Employee } from '../../index';
import { Ticket } from '../../index';

export class Zoo {
    name: string;
    description: string;
    location: string;
    capacity: number;
    openingHours: string;
    closingHours: string;
    spaces: Space[];
    animals: Animal[];
    employees: Employee[];
    tickets: Ticket[];

    constructor(
        name: string, 
        description: string, 
        location: string, 
        capacity: number, 
        openingHours: string, 
        closingHours: string) 
    {
        this.name = name;
        this.description = description;
        this.location = location;
        this.capacity = capacity;
        this.openingHours = openingHours;
        this.closingHours = closingHours;
        this.spaces = [];
        this.animals = [];
        this.employees = [];
        this.tickets = [];
    }

    addSpace(space: Space) {
        this.spaces.push(space);
    }

    addAnimal(animal: Animal) {
        this.animals.push(animal);
    }

    addEmployee(employee: Employee) {
        this.employees.push(employee);
    }

    addTicket(ticket: Ticket) {
        this.tickets.push(ticket);
    }

    validateTicket(ticket: Ticket) {
        this.tickets.forEach((ticket) => {
            if (ticket.id === ticket.id) {
                ticket.isValid = true;
            }
        });
    }

    influenceStatistics() {
        // TODO
    }
}
