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
exports.Employee = void 0;
const supabaseClient_1 = __importDefault(require("../../utils/supabase/supabaseClient"));
class Employee {
    constructor(name, role, availabilities) {
        this.name = name;
        this.role = role;
        this.availabilities = availabilities;
    }
    checkAvailability(date) {
        this.availabilities.forEach((availability) => {
            if (new Date(availability).getTime() === date.getTime()) {
                console.log('Employee is available on this date');
                return true;
            }
        });
        return false;
    }
    //CRUD methods
    // GET /employees
    static fetchEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employees, error } = yield supabaseClient_1.default.supabase
                .from('employees')
                .select('*');
            if (error) {
                console.error(error);
            }
            else {
                return employees;
            }
        });
    }
    // GET /employees/:id
    static fetchEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employee, error } = yield supabaseClient_1.default.supabase
                .from('employees')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
            }
            return employee;
        });
    }
    // POST /employees/create
    static createEmployee(createdEmployee) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employee, error } = yield supabaseClient_1.default.supabase
                .from("employees")
                .insert([Object.assign({}, createdEmployee)]);
            if (error) {
                console.error(error);
            }
            else {
                return employee;
            }
        });
    }
    // PUT /employees/:id
    static updateEmployee(id, name, role, availabilities) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employee, error } = yield supabaseClient_1.default.supabase
                .from("employees")
                .update({ name, role, availabilities })
                .eq("id", id);
            if (error) {
                console.error(error);
            }
            else {
                return employee;
            }
        });
    }
    // DELETE /employees/:id
    static deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employee, error } = yield supabaseClient_1.default.supabase
                .from("employees")
                .delete()
                .eq("id", id);
            if (error) {
                console.error(error);
            }
            else {
                return employee;
            }
        });
    }
    /*
    EMPLOYEES AVAILABILITIES
*/
    // GET /employees/availabilities/
    static fetchEmployeesAvailabilities() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeesAvailabilities, error } = yield supabaseClient_1.default.supabase
                .from("employees_availabilities")
                .select("*");
            if (error) {
                console.error(error);
            }
            else {
                return employeesAvailabilities;
            }
        });
    }
    // GET /employees/availabilities/:id
    static fetchEmployeeAvailabilityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeeAvailability, error } = yield supabaseClient_1.default.supabase
                .from("employees")
                .select("availabilities")
                .eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                return employeeAvailability;
            }
        });
    }
    // PUT /employees/availabilities/:id // TODO: Fix
    static updateEmployeeAvailability(employee_id, day, start_time, end_time) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeeAvailability, error } = yield supabaseClient_1.default.supabase
                .from("employees_availabilities")
                .update({ employee_id, day, start_time, end_time })
                .eq('id', employee_id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(employeeAvailability);
            }
        });
    }
    // DELETE /employees/availabilities/:id
    static deleteEmployeeAvailability(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeeAvailability, error } = yield supabaseClient_1.default.supabase
                .from("employees_availabilities")
                .delete()
                .eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(employeeAvailability);
            }
        });
    }
    // ADMIN ?
    static isAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: admin, error } = yield supabaseClient_1.default.supabase
                .from("employees")
                .select("role")
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
            }
            return admin.role ? admin.role === "admin" || admin.role === "Admin" : false;
        });
    }
    // Vetenarian ? 
    static isVet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: vet, error } = yield supabaseClient_1.default.supabase
                .from("employees")
                .select("role")
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
            }
            return vet.role ? vet.role === "Vetenarian" || vet.role === "vetenarian" : false;
        });
    }
}
exports.Employee = Employee;
//# sourceMappingURL=employee.class.js.map