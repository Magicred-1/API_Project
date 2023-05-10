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
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();
class SupabaseDB {
    constructor() {
        this.supabaseUrl = process.env.SUPABASE_URL;
        this.supabaseKey = process.env.SUPABASE_KEY;
        if (!this.supabaseUrl || !this.supabaseKey) {
            throw new Error('Supabase URL and key are required');
        }
        // Assign the supabase instance to the supabase property
        this.supabase = (0, supabase_js_1.createClient)(this.supabaseUrl, this.supabaseKey);
        if (!this.supabase) {
            throw new Error('Supabase is not initialized');
        }
        else {
            console.log('Supabase is initialized');
        }
    }
    /*
    __________  __  ______
    / ____/ __ \/ / / / __ \
    / /   / /_/ / / / / / / /
    / /___/ _, _/ /_/ / /_/ /
    \____/_/ |_|\____/_____/
    
    */
    /*
        SPACES
    */
    // GET /spaces
    fetchSpaces() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: spaces, error } = yield this.supabase.from("spaces").select("*");
            if (error) {
                console.error(error);
            }
            else {
                return spaces;
            }
        });
    }
    // GET /spaces/:id
    fetchSpaceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: space, error } = yield this.supabase.from("spaces").select("*").eq('id', id);
            if (error) {
                return error;
            }
            else {
                return space;
            }
        });
    }
    // POST /spaces
    createSpace(name, description, capacity) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: space, error } = yield this.supabase.from("spaces").insert([{ name, description, capacity }]);
            if (error) {
                console.error(error);
            }
            else {
                console.log(space);
            }
        });
    }
    // PUT /spaces/:id
    updateSpace(id, name, description, capacity) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: space, error } = yield this.supabase.from("spaces").update({ name, description, capacity }).eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(space);
            }
        });
    }
    // DELETE /spaces/:id
    deleteSpace(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: space, error } = yield this.supabase.from("spaces").delete().eq('id', id);
            if (error) {
                return error;
            }
            else {
                return space;
            }
        });
    }
    /*
        ANIMALS
    */
    // GET /animals
    fetchAnimals() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animals, error } = yield this.supabase.from("animals").select("*");
            if (error) {
                console.error(error);
            }
            else {
                console.log(animals);
            }
        });
    }
    // GET /animals/:id
    fetchAnimalById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield this.supabase.from("animals").select("*").eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(animal);
            }
        });
    }
    // POST /animals
    createAnimal(name, species, age, space_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield this.supabase.from("animals").insert([{ name, species, age, space_id }]);
            if (error) {
                console.error(error);
            }
            else {
                console.log(animal);
            }
        });
    }
    // PUT /animals/:id
    updateAnimal(id, name, species, age, space_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield this.supabase.from("animals").update({ name, species, age, space_id }).eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(animal);
            }
        });
    }
    deleteAnimal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield this.supabase.from("animals").delete().eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(animal);
            }
        });
    }
    /*
        EMPLOYEES
    */
    // GET /employees
    fetchEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employees, error } = yield this.supabase.from("employees").select("*");
            if (error) {
                console.error(error);
            }
            else {
                console.log(employees);
            }
        });
    }
    // GET /employees/:id
    fetchEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employee, error } = yield this.supabase.from("employees").select("*").eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(employee);
            }
        });
    }
    // POST /employees
    createEmployee(name, role, availabilities) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employee, error } = yield this.supabase.from("employees").insert([{ name, role, availabilities }]);
            if (error) {
                console.error(error);
            }
            else {
                console.log(employee);
            }
        });
    }
    // PUT /employees/:id
    updateEmployee(id, name, role, availabilities) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employee, error } = yield this.supabase.from("employees").update({ name, role, availabilities }).eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(employee);
            }
        });
    }
    // DELETE /employees/:id
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employee, error } = yield this.supabase.from("employees").delete().eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(employee);
            }
        });
    }
    /*
        EMPLOYEES AVAILABILITIES
    */
    // GET /employees/availabilities/
    fetchEmployeesAvailabilities() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeesAvailabilities, error } = yield this.supabase.from("employees_availabilities").select("*");
            if (error) {
                console.error(error);
            }
            else {
                console.log(employeesAvailabilities);
            }
        });
    }
    // GET /employees/availabilities/:id
    fetchEmployeeAvailabilityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeeAvailability, error } = yield this.supabase.from("employees_availabilities").select("*").eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(employeeAvailability);
            }
        });
    }
    // POST /employees/availabilities
    createEmployeeAvailability(employee_id, day, start_time, end_time) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeeAvailability, error } = yield this.supabase.from("employees_availabilities").insert([{ employee_id, day, start_time, end_time }]);
            if (error) {
                console.error(error);
            }
            else {
                console.log(employeeAvailability);
            }
        });
    }
    // PUT /employees/availabilities/:id
    updateEmployeeAvailability(id, employee_id, day, start_time, end_time) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeeAvailability, error } = yield this.supabase.from("employees_availabilities").update({ employee_id, day, start_time, end_time }).eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(employeeAvailability);
            }
        });
    }
    // DELETE /employees/availabilities/:id
    deleteEmployeeAvailability(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeeAvailability, error } = yield this.supabase.from("employees_availabilities").delete().eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(employeeAvailability);
            }
        });
    }
}
const supabaseDB = new SupabaseDB();
exports.default = supabaseDB;
//# sourceMappingURL=supabaseClient.js.map