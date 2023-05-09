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

    addTreatment(treatment: string) {
        this.treatments.push(treatment);
    }
}