
const path = require('path');

const pool = require('./db'); 

import express, { Request, Response } from 'express';
import shoppingListRoutes from './routes/shoppingListRoutes';

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api/shopping-list', shoppingListRoutes)

app.get('/api', (req, res) => {
    res.send({message: 'Hello from the backend!' });
});

// app.get('/read-shopping-lists', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM shopping_list');
//         res.status(200).json(result.rows);
//       } catch (err) {
//         console.error('Błąd zapytania:', err);
//         res.status(500).send('Błąd serwera');
//       }

//     res.json({ message: result });
// })

// app.post('/add-list', async (req, res) => {
//     const { listName } = req.body;

//     if (!listName) {
//         return res.status(400).json({ error: 'Variable is required' });
//       }

//     try {
//         const result = await pool.query('INSERT INTO shopping_list (name) VALUES ($1) RETURNING *', [listName]);
//         res.status(200).json(result.rows);
//       } catch (err) {
//         console.error('Błąd zapytania:', err);
//         res.status(500).send('Błąd serwera');
//       }
// })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

