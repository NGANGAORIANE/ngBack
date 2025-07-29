import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertion(body) {

    const { data, error } = await supabase
        .from('restaurants')
        .insert([
            {
                nom: body.nom,
                description: body.description,
                speciality: body.speciality,
                number: body.number,
                adress: body.adress,
                photo: body.photo
            }
        ])

        .select()
    return (data)
}
export { insertion, supabase };