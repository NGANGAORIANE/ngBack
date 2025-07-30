import { supabase } from '../supabase.js';

export async function getPlaces(req, res) {
    const { data, error } = await supabase.from('places').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}

export async function insertPlace(req, res) {
    const { nom, description, localisation, image } = req.body;
    const { data, error } = await supabase
        .from('places')
        .insert([{ name: nom, description, adress: localisation, photo: image }])
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'Lieu ajouté', data });
}

// This function is used to delete a place by its ID
export async function deletePlace(req, res) {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('places')
        .delete()
        .eq('id', id)
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Lieu supprimé', data });
}

// This function is used to update a place by its ID
export async function updatePlace(req, res) {
    const { id } = req.params;
    const { nom, description, localisation, image } = req.body;
    const { data, error } = await supabase
        .from('places')
        .update({ name: nom, description, adress: localisation, photo: image })
        .eq('id', id)
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Lieu mis à jour', data });
}
