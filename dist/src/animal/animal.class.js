"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
class Animal {
    constructor(name, species, space, treatments) {
        this.name = name;
        this.species = species;
        this.space = space;
        this.treatments = treatments;
    }
    // TODO: Add a method to add a treatment to an animal into the Supabase DB using the API
    addTreatment(treatment) {
        this.treatments.push(treatment);
    }
}
exports.Animal = Animal;
//# sourceMappingURL=animal.class.js.map