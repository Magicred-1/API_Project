//route: /animals

import supabaseDB from "../../utils/supabase/supabaseClient"

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

    // CRUD methods
    // GET /animals
    async fetchAnimals() {
        const { data: animals, error } = await supabaseDB.supabase
            .from('animals')
            .select('*')

        if (error) {
            console.error(error);
        } else {
            return animals;
        }
    }

    // GET /animals/:id
    async fetchAnimalById(id: string) {
        const { data: animal, error } = await supabaseDB.supabase
            .from('animals')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(error);
        }
        return animal;
    }

    // POST /animals/create
    async createAnimal(createdAnimal: Animal) {
        const { data: animal, error } = await supabaseDB.supabase
        .from("animals")
        .insert([{...createdAnimal}]);

        if (error) {
            console.error(error);
        } else {
            return animal;
        }
    }

    // PUT /animals/:id
    async updateAnimal(id: string, name: string, species: string, age: number, space_id: number, treatments: string[]) {
        const { data: animal, error } = await supabaseDB.supabase
            .from('animals')
            .update({ name, species, age, space_id, treatments })
            .eq('id', id);

        if (error) {
            console.error(error);
        } else {
            return animal;
        }
    }

    // DELETE /animals/:id
    async deleteAnimal(id: string) {
        const { data: animal, error } = await supabaseDB.supabase
            .from('animals')
            .delete()
            .eq('id', id);

        if (error) {
            console.error(error);
        } else {
            return animal;
        }
    }
}