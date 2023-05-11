import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv';
import AuthMiddleware from '../tokenAuthenfication/authMiddleware';

dotenv.config();

class SupabaseDB {
    supabaseUrl: string | undefined;
    supabaseKey: string | undefined;
    // Define supabase as a property of the class
    supabase: any; 

    constructor() {
        this.supabaseUrl = process.env.SUPABASE_URL;
        this.supabaseKey = process.env.SUPABASE_KEY;

        if (!this.supabaseUrl || !this.supabaseKey) {
            throw new Error('Supabase URL and key are required');
        }

        // Assign the supabase instance to the supabase property
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);

        if (!this.supabase) {
            throw new Error('Supabase is not initialized with the correct credentials or the Supabase URL and key are not defined');
        }
        else {
            console.log('Supabase has been initialized successfully');
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
    async fetchSpaces() {
        const { data: spaces, error } = await this.supabase.from("spaces").select("*");
        if (error) {
            console.error(error);
        } else {
            return spaces;
        }
    }

    // GET /spaces/:id
    async fetchSpaceById(id: number) {
        const { data: space, error } = await this.supabase.from("spaces").select("*").eq('id', id);
        if (error) {
            return error;
        } else {
            return space;
        }
    }

    // POST /spaces
    async createSpace(name: string, description: string, capacity: string) {
        const { data: space, error } = await this.supabase.from("spaces").insert([{ name, description, capacity }]);
        if (error) {
            console.error(error);
        } else {
            console.log(space);
        }
    }

    // PUT /spaces/:id
    async updateSpace(id: number, name: string, description: string, capacity: number) {
        const { data: space, error } = await this.supabase.from("spaces").update({ name, description, capacity }).eq('id', id);
        if (error) {
            console.error(error);
        } else {
            console.log(space);
        }
    }

    // DELETE /spaces/:id
    async deleteSpace(id: number) {
        const { data: space, error } = await this.supabase.from("spaces").delete().eq('id', id);
        if (error) {
            return error;
        } else {
            return space;
        }
    }

    /*
        ANIMALS
    */

    // GET /animals
    async fetchAnimals() {
        const { data: animals, error } = await this.supabase.from("animals").select("*");
        if (error) {
            console.error(error);
        } else {
            console.log(animals);
        }
    }

    // GET /animals/:id
    async fetchAnimalById(id: number) {
        const { data: animal, error } = await this.supabase.from("animals").select("*").eq('id', id);
        if (error) {
            console.error(error);
        } else {
            console.log(animal);
        }
    }

    // POST /animals
    async createAnimal(name: string, species: string, age: number, space_id: number) {
        const { data: animal, error } = await this.supabase.from("animals").insert([{ name, species, age, space_id }]);
        if (error) {
            console.error(error);
        } else {
            console.log(animal);
        }
    }

    // PUT /animals/:id
    async updateAnimal(id: number, name: string, species: string, age: number, space_id: number) {
        const { data: animal, error } = await this.supabase.from("animals").update({ name, species, age, space_id }).eq('id', id);
        if (error) {
            console.error(error);
        } else {
            console.log(animal);
        }
    }

    async deleteAnimal(id: number) {
        const { data: animal, error } = await this.supabase.from("animals").delete().eq('id', id);
        if (error) {
            console.error(error);
        } else {
            console.log(animal);
        }
    }

    /*
        EMPLOYEES
    */

    // GET /employees
    async fetchEmployees() {
        const { data: employees, error } = await this.supabase.from("employees").select("*");
        if (error) {
            console.error(error);
        } else {
            console.log(employees);
        }
    }

    // GET /employees/:id
    async fetchEmployeeById(id: number) {
        const { data: employee, error } = await this.supabase.from("employees").select("*").eq('id', id);
        if (error) {
            console.error(error);
        } else {
            console.log(employee);
        }
    }

    // TODO: Add availabilities to employee
    async createEmployee(name: string, role: string) {
        try {
            const api_key = AuthMiddleware.generateAPIKey();
            const { data: employee, error } = await this.supabase.from("employees").insert([{ name, role, api_key }]);
        
            if (error) {
                console.error(error);
            }
            return employee;
        } catch (error) {
            console.error(error);
        }
    }
    

    // PUT /employees/:id
    async updateEmployee(id: number, name: string, role: string, availabilities: string[]) {
        const { data: employee, error } = await this.supabase.from("employees").update({ name, role, availabilities }).eq('id', id);
        if (error) {
            console.error(error);
        } else {
            console.log(employee);
        }
    }

    // DELETE /employees/:id
    async deleteEmployee(id: number) {
        const { data: employee, error } = await this.supabase.from("employees").delete().eq('id', id);
        if (error) {
            console.error(error);
        } else {
            console.log(employee);
        }
    }

    /*
        EMPLOYEES AVAILABILITIES
    */

    // GET /employees/availabilities/
    async fetchEmployeesAvailabilities() {
        const { data: employeesAvailabilities, error } = await this.supabase.from("employees_availabilities").select("*");
        if (error) {
            console.error(error);
        } else {
            console.log(employeesAvailabilities);
        }
    }

    // GET /employees/availabilities/:id
    async fetchEmployeeAvailabilityById(id: number) {
        const { data: employeeAvailability, error } = await this.supabase.from("employees_availabilities").select("*").eq('id', id);
        if (error) {
            console.error(error);
        } else {
            console.log(employeeAvailability);
        }
    }

    // POST /employees/availabilities
    async addEmployeeAvailability(employee_id: number, day: string, start_time: string, end_time: string) {
        const { data: employeeAvailability, error } = await this.supabase.from("employees_availabilities").insert([{ employee_id, day, start_time, end_time }]);
        if (error) {
            console.error(error);
        } else {
            console.log(employeeAvailability);
        }
    }

    // PUT /employees/availabilities/:id
    async updateEmployeeAvailability(id: number, employee_id: number, day: string, start_time: string, end_time: string) {
        const { data: employeeAvailability, error } = await this.supabase.from("employees_availabilities").update({ employee_id, day, start_time, end_time }).eq('id', id);
        if (error) {
            console.error(error);
        } else {
            console.log(employeeAvailability);
        }
    }

    // DELETE /employees/availabilities/:id
    async deleteEmployeeAvailability(id: number) {
        const { data: employeeAvailability, error } = await this.supabase.from("employees_availabilities").delete().eq('id', id);
        if (error) {
            console.error(error);
        } else {
            console.log(employeeAvailability);
        }
    }
}

const supabaseDB = new SupabaseDB();
export default supabaseDB;
