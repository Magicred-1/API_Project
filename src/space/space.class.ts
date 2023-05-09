import { Animal } from '../animal/animal.class';

export class Space {
    name: string;
    description: string;
    images: string[];
    type: string;
    capacity: number;
    duration: string;
    openingHours: string;
    closingHours: string;
    disabledAccess: boolean;
    maintenance: boolean;
    upcomingMaintenanceDate: string[];

    constructor(
        name: string,
        description: string,
        images: string[],
        type: string,
        capacity: number,
        duration: string,
        openingHours: string,
        closingHours: string,
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

    turnOnMaintenance() {
        this.maintenance = true;
    }

    planMaintenance(date: string) {
        this.upcomingMaintenanceDate.push(date);
    }

    getAnimalTreatment(animal: Animal) {
        animal.treatments.forEach((treatment) => {
            console.log(treatment);
        });
    }


}