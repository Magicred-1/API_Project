import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv';
import colors from 'colors/safe';

dotenv.config();

class SupabaseDB {
    supabaseUrl: string | undefined;
    supabaseKey: string | undefined;
    // Define supabase as a property of the class
    supabase: any;

    constructor() {
        this.supabaseUrl = process.env.SUPABASE_URL;
        this.supabaseKey = process.env.SUPABASE_KEY;

        if (!this.supabaseUrl || !this.supabaseKey) {
            throw new Error('Supabase URL and key are required');
        }

        // Assign the supabase instance to the supabase property
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);

        if (!this.supabase) {
            throw new Error('Supabase is not initialized with the correct credentials or the Supabase URL and key are not defined');
        }
        else {
            console.log(colors.bgGreen('Supabase has been initialized successfully'));
        }
    }
}
const supabaseDB = new SupabaseDB();
export default supabaseDB;
