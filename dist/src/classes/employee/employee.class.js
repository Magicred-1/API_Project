"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(name, role, availabilities) {
        this.name = name;
        this.role = role;
        this.availabilities = availabilities;
    }
    checkAvailability(date) {
        this.availabilities.forEach((availability) => {
            if (availability === date) {
                console.log('Employee is available on this date');
            }
            return true;
        });
        return false;
    }
}
exports.Employee = Employee;
//# sourceMappingURL=employee.class.js.map