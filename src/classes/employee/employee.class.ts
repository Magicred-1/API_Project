export class Employee {
    name: string;
    role: string;
    availabilities: string[];

    constructor(name: string, role: string, availabilities: string[]) {
        this.name = name;
        this.role = role;
        this.availabilities = availabilities;
    }

    checkAvailability(date: string): boolean {
        this.availabilities.forEach((availability) => {
            if (availability === date) {
                console.log('Employee is available on this date');
            }
            return true;
        });
        return false;
    }
}