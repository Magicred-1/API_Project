"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Space = void 0;
class Space {
    constructor(name, description, images, type, capacity, duration, openingHours, closingHours, disabledAccess, maintenance, upcomingMaintenanceDate) {
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
    planMaintenance(date) {
        this.upcomingMaintenanceDate.push(date);
    }
    getAnimalTreatment(animal) {
        animal.treatments.forEach((treatment) => {
            console.log(treatment);
        });
    }
}
exports.Space = Space;
//# sourceMappingURL=space.class.js.map