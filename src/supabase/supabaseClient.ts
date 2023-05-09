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

    async fetchUsers() {
        const { data: users, error } = await this.supabase.from("users").select("*");
        if (error) {
            console.error(error);
        } else {
            console.log(users);
        }
    }
}

const supabaseDB = new SupabaseDB();
export default supabaseDB;
