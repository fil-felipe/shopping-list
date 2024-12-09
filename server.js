const express = require('express');
const path = require('path');
const app = express();

// import { getShoppingLists, addShoppingList } from './shoppingDB';
const pool = require('./db'); // Importuj plik db.js

const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/api', (req, res) => {
    res.send({message: 'Hello from the backend!' });
});

app.get('/read-shopping-lists', async (req, res) => {

    // const result = await getShoppingLists();

    try {
        const result = await pool.query('SELECT * FROM shopping_list');
        // console.log(result);
        res.status(200).json(result.rows);
      } catch (err) {
        console.error('Błąd zapytania:', err);
        res.status(500).send('Błąd serwera');
      }

    // res.json({ message: result.rows });
})

app.post('/add-list', async (req, res) => {
    console.log(req.body);
    const { listName } = req.body;

    if (!listName) {
        return res.status(400).json({ error: 'Variable is required' });
      }
    
    //   const result = await addShoppingList(listName);
    // res.json({ message: result });
    try {
        const result = await pool.query('INSERT INTO shopping_list (name) VALUES ($1) RETURNING *', [listName]);
        res.status(200).json(result.rows);
      } catch (err) {
        console.error('Błąd zapytania:', err.stack);
        res.status(500).send('Błąd serwera');
      }

    // res.json({ message: result });
})

// The "catchall" handler: for any request that doesn't 
// match one above, send back React's index.html file.

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

