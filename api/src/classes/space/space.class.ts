//route: /spaces

import { Animal } from '../animal/animal.class';
import supabaseDB from '../../utils/supabase/supabaseClient';

export class Space {
    name: string;
    description: string;
    images: string[];
    type: string;
    capacity: string;
    duration: string;
    // Maybe make this an array of strings
    openingHours: string[];
    // Maybe make this an array of strings (too !)
    closingHours: string[];
    disabledAccess: boolean;
    maintenance: boolean;
    upcomingMaintenanceDate: string[];

    constructor(
        name: string,
        description: string,
        images: string[],
        type: string,
        capacity: string,
        duration: string,
        openingHours: string[],
        closingHours: string[],
        disabledAccess: boolean,
        maintenance: boolean,
        upcomingMaintenanceDate: string[]
    ) {
        this.name = name;
        this.description = description;
        this.images = images;
        this.type = type;
        this.capacity = capacity;
        this.duration = duration;
        this.openingHours = openingHours;
        this.closingHours = closingHours;
        this.disabledAccess = disabledAccess;
        this.maintenance = maintenance;
        this.upcomingMaintenanceDate = upcomingMaintenanceDate;
    }

    turnOnMaintenance(): boolean {
        this.maintenance = true;
        return this.maintenance;
    }

    planMaintenance(date: string) {
        this.upcomingMaintenanceDate.push(date);
    }

    getAnimalTreatment(animal: Animal) {
        animal.treatments.forEach((treatment) => {
            console.log(treatment);
        });
    }

    // CRUD methods
    // GET /spaces
    static async fetchSpaces(): Promise<void> {
        const { data: spaces, error } = await supabaseDB.supabase
        .from("spaces")
        .select("*");

        if (error) {
            console.error(error);
        } else {
            return spaces;
        }
    }

    // GET /spaces/:id
    static async fetchSpaceById(id: number): Promise<void> {
        const { data: space, error } = await supabaseDB.supabase
        .from("spaces")
        .select("*")
        .eq('id', id);

        if (error) {
            return error;
        } else {
            return space;
        }
    }

    // POST /spaces
    static async createSpace(
        createdSpace: Space
        ): Promise<any> {
        const { data: space, error } = await supabaseDB.supabase
        .from("spaces")
        .insert([{ ...createdSpace }]);

        if (error) {
            console.error(error);
        } else {
            console.log(space);
        }
    }

    // PUT /spaces/:id
    static async updateSpace(id: number, name: string, description: string, capacity: string, images: string[], type: string, duration: string, openingHours: string[], closingHours: string[], disabledAccess: boolean, upcomingMaintenanceDate: string[]): Promise<void> {
        const { data: space, error } = await supabaseDB.supabase
        .from("spaces")
        .update([{ name, description, capacity, images, type, duration, openingHours, closingHours, disabledAccess, upcomingMaintenanceDate }])
        .eq('id', id);

        if (error) {
            console.error(error);
        } else {
            return space;
        }
    }

    // DELETE /spaces/:id
    static async deleteSpace(id: number): Promise<void> {
        const { data: space, error } = await supabaseDB.supabase
        .from("spaces")
        .delete()
        .eq('id', id);

        if (error) {
            return error;
        } else {
            return space;
        }
    }
}
export default Space;