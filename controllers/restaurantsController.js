import { supabase } from '../supabase.js';

export async function getRestaurants(req, res) {
    const { data, error } = await supabase.from('restaurants').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}

export async function insertRestaurant(req, res) {
    const { nom, speciality, description, adress, number, photo } = req.body;
    const { data, error } = await supabase
        .from('restaurants')
        .insert([{ nom, speciality, description, adress, number, photo }])
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'Restaurant ajouté', data });
}

// This function is used to delete a restaurant by its ID
export async function deleteRestaurant(req, res) {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('restaurants')
        .delete()
        .eq('id', id)
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Restaurant supprimé', data });
}

// This function is used to update a restaurant by its ID
export async function updateRestaurant(req, res) {  
    const { id } = req.params;
    const { nom, speciality, description, adress, number, photo } = req.body;
    const { data, error } = await supabase
        .from('restaurants')
        .update({ nom, speciality, description, adress, number, photo })
        .eq('id', id)
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Restaurant mis à jour', data });
}