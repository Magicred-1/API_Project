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
exports.Zoo = void 0;
const supabaseClient_1 = __importDefault(require("../../utils/supabase/supabaseClient"));
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
    // CRUD methods
    // GET /zoo
    fetchZoo() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: zoo, error } = yield supabaseClient_1.default.supabase
                .from('zoo')
                .select('*');
            if (error) {
                console.error(error);
            }
            return zoo;
        });
    }
}
exports.Zoo = Zoo;
//# sourceMappingURL=zoo.class.js.map