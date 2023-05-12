export class Animal {
    name: string;
    species: string;
    space: string;
    treatments: string[];

    constructor(name: string, species: string, space: string, treatments: string[]) {
        this.name = name;
        this.species = species;
        this.space = space;
        this.treatments = treatments;
    }

    // TODO: Add a method to add a treatment to an animal into the Supabase DB using the API
    addTreatment(treatment: string) {
        this.treatments.push(treatment);
    }
}