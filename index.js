import express from 'express';
import cors from 'cors';

import restaurantRoutes from './routes/restaurants.js';
import eventsRoutes from './routes/events.js';
import placesRoutes from './routes/places.js';
import menusRoutes from './routes/menus.js';
import favorisRoutes from './routes/favoris.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Nkwagabon fonctionne ✅');
});

app.use('/restaurants', restaurantRoutes);
app.use('/events', eventsRoutes);
app.use('/places', placesRoutes);
app.use('/menus', menusRoutes);
app.use('/favoris', favorisRoutes);

// Export app for testing
export default app;

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(port,'0.0.0.0', () => {
        console.log(`Serveur lancé : http://localhost:${port}`);
    });
}
