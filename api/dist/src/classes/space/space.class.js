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
exports.Space = void 0;
const supabaseClient_1 = __importDefault(require("../../utils/supabase/supabaseClient"));
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
        return this.maintenance;
    }
    planMaintenance(date) {
        this.upcomingMaintenanceDate.push(date);
    }
    getAnimalTreatment(animal) {
        animal.treatments.forEach((treatment) => {
            console.log(treatment);
        });
    }
    // CRUD methods
    // GET /spaces
    static fetchSpaces() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: spaces, error } = yield supabaseClient_1.default.supabase
                .from("spaces")
                .select("*");
            if (error) {
                console.error(error);
            }
            else {
                return spaces;
            }
        });
    }
    // GET /spaces/:id
    static fetchSpaceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: space, error } = yield supabaseClient_1.default.supabase
                .from("spaces")
                .select("*")
                .eq('id', id);
            if (error) {
                return error;
            }
            else {
                return space;
            }
        });
    }
    // POST /spaces
    static createSpace(createdSpace) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: space, error } = yield supabaseClient_1.default.supabase
                .from("spaces")
                .insert([Object.assign({}, createdSpace)]);
            if (error) {
                console.error(error);
            }
            else {
                console.log(space);
            }
        });
    }
    // PUT /spaces/:id
    static updateSpace(id, name, description, capacity, images, type, duration, openingHours, closingHours, disabledAccess, upcomingMaintenanceDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: space, error } = yield supabaseClient_1.default.supabase
                .from("spaces")
                .update([{ name, description, capacity, images, type, duration, openingHours, closingHours, disabledAccess, upcomingMaintenanceDate }])
                .eq('id', id);
            if (error) {
                console.error(error);
            }
            else {
                return space;
            }
        });
    }
    // DELETE /spaces/:id
    static deleteSpace(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: space, error } = yield supabaseClient_1.default.supabase
                .from("spaces")
                .delete()
                .eq('id', id);
            if (error) {
                return error;
            }
            else {
                return space;
            }
        });
    }
}
exports.Space = Space;
exports.default = Space;
//# sourceMappingURL=space.class.js.map