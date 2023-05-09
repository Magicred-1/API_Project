import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv';

dotenv.config();

class SupabaseDB {
    supabaseUrl: string | undefined;
    supabaseKey: string | undefined;
    supabase: any; // Define supabase as a property of the class

    constructor() {
        this.supabaseUrl = process.env.SUPABASE_URL;
        this.supabaseKey = process.env.SUPABASE_KEY;

        if (!this.supabaseUrl || !this.supabaseKey) {
            throw new Error('Supabase URL and key are required');
        }

        // Assign the supabase instance to the supabase property
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);

        if (!this.supabase) {
            throw new Error('Supabase is not initialized');
        }
        else {
            console.log('Supabase is initialized');
        }
    }

    /*
    __________  __  ______ 
    / ____/ __ \/ / / / __ \
    / /   / /_/ / / / / / / /
    / /___/ _, _/ /_/ / /_/ / 
    \____/_/ |_|\____/_____/  
    
    */
    // Create
    async createUser(name: string) {
        try {
            const { data, error } = await this.supabase.from('users').insert([
                { name: name },
            ]);
            if (error) {
                throw error;
            }
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    // Read
    async fetchUsers() {
        try {
            const { data: users, error } = await this.supabase.from("users").select("*");
            if (error) {
                throw error;
            }
            return users;
        } catch (error) {
            console.error(error);
        }
    }
    // Update
    async updateUser(id: number, name: string) {
        try{
            const { data, error } = await this.supabase.from('users').update({ name: name }).match({ id: id });
            if (error) {
                throw error;
            }
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    // Delete
    async deleteUser(id: number) {
        const { data: user, error } = await this.supabase
            .from('users')
            .delete()
            .match({ id });
    }
}

const supabaseDB = new SupabaseDB();
export default supabaseDB;
