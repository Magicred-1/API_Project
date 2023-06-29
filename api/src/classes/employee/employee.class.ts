import supabaseDB from "../../utils/supabase/supabaseClient"

export class Employee {
    name: string;
    role: string;
    availabilities: string[];

    constructor(name: string, role: string, availabilities: string[]) {
        this.name = name;
        this.role = role;
        this.availabilities = availabilities;
    }

    checkAvailability(date: Date): boolean {
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
    static async fetchEmployees() {
        const { data: employees, error } = await supabaseDB.supabase
            .from('employees')
            .select('*')

        if (error) {
            console.error(error);
        } else {
            return employees;
        }
    }

    // GET /employees/:id
    static async fetchEmployeeById(id: number) {
        const { data: employee, error } = await supabaseDB.supabase
            .from('employees')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(error);
        }
        return employee;
    }

    // POST /employees/create
    static async createEmployee(createdEmployee: Employee) {
        const { data: employee, error } = await supabaseDB.supabase
        .from("employees")
        .insert([{ ...createdEmployee }]);

        if (error) {
            console.error(error);
        } else {
            return employee;
        }
    }

    // PUT /employees/:id
    static async updateEmployee(id: number, name: string, role: string, availabilities: string[]) {
        const { data: employee, error } = await supabaseDB.supabase
        .from("employees")
        .update({ name, role, availabilities })
        .eq("id", id);

        if (error) {
            console.error(error);
        } else {
            return employee;
        }
    }

    // DELETE /employees/:id
    static async deleteEmployee(id: number) {
        const { data: employee, error } = await supabaseDB.supabase
        .from("employees")
        .delete()
        .eq("id", id);

        if (error) {
            console.error(error);
        } else {
            return employee;
        }
    }

        /*
        EMPLOYEES AVAILABILITIES
    */

    // GET /employees/availabilities/
    static async fetchEmployeesAvailabilities() {
        const { data: employeesAvailabilities, error } = await supabaseDB.supabase
        .from("employees_availabilities")
        .select("*");

        if (error) {
            console.error(error);
        } else {
            return employeesAvailabilities;
        }
    }

    // GET /employees/availabilities/:id
    static async fetchEmployeeAvailabilityById(id: number) {
        const { data: employeeAvailability, error } = await supabaseDB.supabase
        .from("employees")
        .select("availabilities")
        .eq('id', id);
        
        if (error) {
            console.error(error);
        } else {
            return employeeAvailability;
        }
    }

    // PUT /employees/availabilities/:id // TODO: Fix
    static async updateEmployeeAvailability(employee_id: number, day: string, start_time: string, end_time: string) {
        const { data: employeeAvailability, error } = await supabaseDB.supabase
        .from("employees_availabilities")
        .update({ employee_id, day, start_time, end_time })
        .eq('id', employee_id);

        if (error) {
            console.error(error);
        } else {
            console.log(employeeAvailability);
        }
    }

    // DELETE /employees/availabilities/:id
    static async deleteEmployeeAvailability(id: number) {
        const { data: employeeAvailability, error } = await supabaseDB.supabase
        .from("employees_availabilities")
        .delete()
        .eq('id', id);

        if (error) {
            console.error(error);
        } else {
            console.log(employeeAvailability);
        }
    }

    // ADMIN ?
    static async isAdmin(id: number): Promise<boolean> {
        const { data: admin, error } = await supabaseDB.supabase
        .from("employees")
        .select("role")
        .eq('id', id)
        .single();

        if (error) {
            console.error(error);
        }
        return admin.role ? admin.role === "admin" || admin.role === "Admin" : false;
    }

    // Vetenarian ? 
    static async isVet(id: number): Promise<boolean> {
        const { data: vet, error } = await supabaseDB.supabase
        .from("employees")
        .select("role")
        .eq('id', id)
        .single();

        if (error) {
            console.error(error);
        }
        return vet.role ? vet.role === "Vetenarian" || vet.role === "vetenarian" : false;
    }
}