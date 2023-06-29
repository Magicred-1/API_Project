"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
const supabaseClient_1 = __importDefault(require("../../utils/supabase/supabaseClient"));
class Animal {
    constructor(name, species, space, treatments) {
        this.name = name;
        this.species = species;
        this.space = space;
        this.treatments = treatments;
    }
    addTreatment(treatment) {
        this.treatments.push(treatment);
    }
    // CRUD methods
    // GET /animals
    fetchAnimals() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animals, error } = yield supabaseClient_1.default.supabase
                .from('animals')
                .select('*');
            if (error) {
                console.error(error);
            }
            else {
                return animals;
            }
        });
    }
    // GET /animals/:id
    fetchAnimalById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield supabaseClient_1.default.supabase
                .from('animals')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
            }
            return animal;
        });
    }
    // POST /animals/create
    createAnimal(createdAnimal) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield supabaseClient_1.default.supabase
                .from("animals")
                .insert([Object.assign({}, createdAnimal)]);
            if (error) {
                console.error(error);
            }
            else {
                return animal;
            }
        });
    }
    // PUT /animals/:id
    updateAnimal(id, name, species, age, space_id, treatments) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield supabaseClient_1.default.supabase
                .from('animals')
                .update({ name, species, age, space_id, treatments })
                .eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                return animal;
            }
        });
    }
    // DELETE /animals/:id
    deleteAnimal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: animal, error } = yield supabaseClient_1.default.supabase
                .from('animals')
                .delete()
                .eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                return animal;
            }
        });
    }
}
exports.Animal = Animal;
//# sourceMappingURL=animal.class.js.map