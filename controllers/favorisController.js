import { supabase } from '../supabase.js';
export async function addFavori(req, res) {
    const { user_id, element_id, type } = req.body;


    const { data, error } = await supabase
        .from('favoris')
        .insert([{ user_id, element_id, type }])
        .select();

    if (error) {
        console.error("Erreur Supabase :", error);
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Ajouté aux favoris', data });
}


// Récupérer les favoris d'un utilisateur
export async function getFavorisByUser(req, res) {
    const { user_id } = req.params;

    const { data, error } = await supabase
        .from('favoris')
        .select('*')
        .eq('user_id', user_id);

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
}
// Supprimer un favori 
export async function removeFavori(req, res) {
    const { user_id, element_id, type } = req.body;

    const { data, error } = await supabase
        .from('favoris')
        .delete()
        .match({ user_id, element_id, type });

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: 'Supprimé des favoris', data });
}
