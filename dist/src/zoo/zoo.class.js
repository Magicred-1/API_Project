"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zoo = void 0;
class Zoo {
    constructor(name, description, location, capacity, openingHours, closingHours) {
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
    addSpace(space) {
        this.spaces.push(space);
    }
    addAnimal(animal) {
        this.animals.push(animal);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    addTicket(ticket) {
        this.tickets.push(ticket);
    }
    validateTicket(ticket) {
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
exports.Zoo = Zoo;
//# sourceMappingURL=zoo.class.js.map