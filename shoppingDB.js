const pool = require('./db'); // Importuj plik db.js

// Przykładowa funkcja pobierająca dane
async function getShoppingLists() {
  try {
    const result = await pool.query('SELECT * FROM shopping_list');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd serwera');
  }
}

export async function addShoppingList(listName) {
  try {
    // Połączenie z bazą danych
    // await client.connect();

    // Wstawianie danych do tabeli
    // const result = await client.query('INSERT INTO shopping_list (name) VALUES ($1) RETURNING *', [name]);

    const result = await pool.query('INSERT INTO shopping_list (name) VALUES ($1) RETURNING *', [listName]);

    return `Item added: ${result.rows[0]}`;
  } catch (err) {
    const errorMsg = `Error inserting item: ${err.stack}`;
    console.error(errorMsg);
    return errorMsg
  } 
  // finally {
    // Rozłączenie z bazą danych
    // await client.end();
  // }
}

module.exports = { getUsers };
