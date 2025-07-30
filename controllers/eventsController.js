import { supabase } from '../supabase.js';

export async function getEvents(req, res) {
    const { data, error } = await supabase.from('events').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}

export async function insertEvents(req, res) {
    const { titre, date, lieu, image } = req.body;
    const { data, error } = await supabase
        .from('events')
        .insert([{ name: titre, date, adress: lieu, photo: image }])
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'Événement ajouté', data });
}

// This function is used to delete an event by its ID
export async function deleteEvent(req, res) {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Événement supprimé', data });
}

// This function is used to update an event by its ID
export async function updateEvent(req, res) {
    const { id } = req.params;
    const { titre, date, lieu, image } = req.body;
    const { data, error } = await supabase
        .from('events')
        .update({ name: titre, date, adress: lieu, photo: image })
        .eq('id', id)
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Événement mis à jour', data });
}

