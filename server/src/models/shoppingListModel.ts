import pool from '../db';

export interface ShoppingListItem {
    id: number;
    name: string;
}

export const createShoppingList = async (name: string): Promise<ShoppingListItem> => {
    const query = 'INSERT INTO shopping_list (name) VALUES ($1) RETURNING *';

    const result = await pool.query(query, [name]);
    return result.rows[0];
}

export const getShoppingLists = async (): Promise<ShoppingListItem[]> => {
    const result = await pool.query('SELECT * FROM shopping_list');
    return result.rows
}

export const getShoppingList = async (id: number): Promise<ShoppingListItem | null> => {
    const query = 'SELECT * FROM shopping_list WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null
}

export const updateShoppingList = async (id: number, name: string): Promise<string | null> => {
    const query = 'UPDATE shopping_list SET name = $1 WHERE id = $2';
    const values = [name, id];

    const result = await pool.query(query, values);

    if (result.command === "UPDATE" && result.rowCount) {
        return `Updated ${result.rowCount} items.`
    }
    return null;
}

export const deleteShoppingList = async (id: number): Promise<string | null> => {
    const query = 'DELETE FROM shopping_list WHERE id = $1';

    const result = await pool.query(query, [id]);
    if (result.command === "DELETE" && result.rowCount) {
        return `Deleted ${result.rowCount} items.`
    }
    return null;
}