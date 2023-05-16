"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv = __importStar(require("dotenv"));
const authMiddleware_1 = __importDefault(require("../tokenAuthenfication/authMiddleware"));
const safe_1 = __importDefault(require("colors/safe"));
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
            throw new Error('Supabase is not initialized with the correct credentials or the Supabase URL and key are not defined');
        }
        else {
            console.log(safe_1.default.blue('Supabase has been initialized successfully'));
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
            const { data: spaces, error } = yield this.supabase
                .from("spaces")
                .select("*");
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
            const { data: space, error } = yield this.supabase
                .from("spaces")
                .select("*")
                .eq('id', id);
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
            const { data: space, error } = yield this.supabase
                .from("spaces")
                .insert([{ name, description, capacity }]);
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
            const { data: space, error } = yield this.supabase
                .from("spaces")
                .update({ name, description, capacity })
                .eq('id', id);
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
            const { data: space, error } = yield this.supabase
                .from("spaces")
                .delete()
                .eq('id', id);
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
            const { data: animals, error } = yield this.supabase
                .from("animals")
                .select("*");
            if (error) {
                console.error(error);
            }
            else {
                return animals;
            }
        });
    }
    // GET /animals/:id
    fetchAnimalById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield this.supabase
                .from("animals")
                .select("*")
                .eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                return animal;
            }
        });
    }
    // POST /animals/create
    createAnimal(name, species, age, space_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield this.supabase
                .from("animals")
                .insert([{ name, species, age, space_id }]);
            if (error) {
                console.error(error);
            }
            else {
                return animal;
            }
        });
    }
    // PUT /animals/update/:id
    updateAnimal(id, name, species, age, space_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield this.supabase
                .from("animals")
                .update({ name, species, age, space_id })
                .eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                console.log(animal);
            }
        });
    }
    // DELETE /animals/:id
    deleteAnimal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield this.supabase
                .from("animals")
                .delete()
                .eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                return animal;
            }
        });
    }
    /*
        EMPLOYEES
    */
    // GET /employees
    fetchEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employees, error } = yield this.supabase
                .from("employees")
                .select("id, name, created_at, role, availabilities");
            if (error) {
                console.error(error);
            }
            else {
                return employees;
            }
        });
    }
    // GET /employees/:id
    fetchEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employee, error } = yield this.supabase
                .from("employees")
                .select("id, name, created_at, role, availabilities")
                .eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                return employee;
            }
        });
    }
    createEmployee(name, role, availabilities) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const api_key = authMiddleware_1.default.generateAPIKey();
                const { data: employee, error } = yield this.supabase
                    .from("employees")
                    .insert([{ name, role, availabilities, api_key }]);
                if (error) {
                    console.error(error);
                }
                return employee;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    // PUT /employees/:id
    updateEmployee(id, name, role, availabilities) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employee, error } = yield this.supabase
                .from("employees")
                .update({ name, role, availabilities }).eq('id', id);
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
            const { data: employee, error } = yield this.supabase
                .from("employees")
                .delete()
                .eq('id', id);
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
            const { data: employeesAvailabilities, error } = yield this.supabase
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
    fetchEmployeeAvailabilityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeeAvailability, error } = yield this.supabase
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
    // TODO: Add availabilities to employee
    // // POST /employees/availabilities
    // async addEmployeeAvailability(employee_id: number, day: string, start_time: string, end_time: string) {
    //     const { data: employeeAvailability, error } = await this.supabase
    //     .from("employees_availabilities")
    //     .insert([{ employee_id, day, start_time, end_time }]);
    //     if (error) {
    //         console.error(error);
    //     } else {
    //         console.log(employeeAvailability);
    //     }
    // }
    // PUT /employees/availabilities/:id // TODO: Fix
    updateEmployeeAvailability(employee_id, day, start_time, end_time) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: employeeAvailability, error } = yield this.supabase.
                from("employees_availabilities").
                update({ employee_id, day, start_time, end_time }).
                eq('id', employee_id);
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
            const { data: employeeAvailability, error } = yield this.supabase
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
    // Admins
    isAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: admin, error } = yield this.supabase
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
    // Veternarians
    isVet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: vet, error } = yield this.supabase
                .from("employees")
                .select("role")
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
            }
            return vet.role ? vet.role === "vet" || vet.role === "Vet" : false;
        });
    }
}
const supabaseDB = new SupabaseDB();
exports.default = supabaseDB;
//# sourceMappingURL=supabaseClient.js.map