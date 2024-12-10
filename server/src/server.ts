
import path from 'path';
import express from 'express';
import cors from 'cors';

import shoppingListRoutes from './routes/shoppingListRoutes';
import shoppingItemRoutes from './routes/shoppingItemRoutes';

const app = express();
const port = process.env.PORT || 5000;

const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:3000', // Tylko frontend na localhost:3000
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Dozwolone metody
    allowedHeaders: ['Content-Type', 'Authorization'], // Dozwolone nagłówki
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api/shopping-list', shoppingListRoutes);
app.use('/api/shopping-item', shoppingItemRoutes)

app.get('/api', (req, res) => {
    res.send({message: 'Hello from the backend!' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

