import { supabase } from '../supabase.js';

//recupère tous les menus d'un restaurant
export async function getMenusByRestaurant(req, res) {
    const { restaurant_id } = req.params;

    const { data, error } = await supabase
        .from('menus')
        .select('*')
        .eq('restaurant_id', restaurant_id);

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
}

// Ajouter un menu pour un restaurant spécifique
export async function insertMenu(req, res) {
    const { restaurant_id, nom, description, prix, photo } = req.body;

    if (!restaurant_id || !nom || !prix) {
        return res.status(400).json({ error: 'Champs requis manquants.' });
    }

    const { data, error } = await supabase
        .from('menus')
        .insert([{ restaurant_id, nom, description, prix, photo }])
        .select();

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ message: 'Menu ajouté', data });
}

// Supprimer un menu par son ID
export async function deleteMenu(req, res) {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('menus')
        .delete()
        .eq('id', id)
        .select();

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: 'Menu supprimé', data });
}

// Mettre à jour un menu par son ID
export async function updateMenu(req, res) {
    const { id } = req.params;
    const { nom, description, prix, photo } = req.body;

    const { data, error } = await supabase
        .from('menus')
        .update({ nom, description, prix, photo })
        .eq('id', id)
        .select();

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: 'Menu mis à jour', data });
}
