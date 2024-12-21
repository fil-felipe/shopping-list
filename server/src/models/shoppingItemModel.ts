import pool from '../db';

export interface ShoppingItem {
    id: number;
    listId: number;
    name: string;
    category?: string;
    bought: boolean;
}

export const createShoppingItem = async (listId: number, name: string, category: string | null=null, bought: boolean =false): Promise<ShoppingItem> => {
    const query = 'INSERT INTO shopping_items (list_id, item_name, item_category, bought) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [listId, name, category, bought];

    const result = await pool.query(query, values);
    return result.rows[0];
}

export const getAllListItems = async (listId: number): Promise<ShoppingItem[]> => {
    const result = await pool.query('SELECT * FROM shopping_items WHERE list_id = $1 ORDER BY item_category, item_name', [listId]);
    return result.rows
}

export const getSingleItem = async (id: number): Promise<ShoppingItem | null> => {
    const query = 'SELECT * FROM shopping_items WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null
}

export const updateSingleItem = async (id: number, name: string, category: string | null=null, bought: boolean =false): Promise<string | null> => {
    const query = 'UPDATE shopping_items SET item_name = $1, item_category = $2, bought = $3  WHERE id = $4';
    const values = [name, category, bought, id];

    const result = await pool.query(query, values);

    if (result.command === "UPDATE" && result.rowCount) {
        return `Updated ${result.rowCount} items.`
    }
    return null;
}

export const deleteSingleItem = async (id: number): Promise<string | null> => {
    const query = 'DELETE FROM shopping_items WHERE id = $1';

    const result = await pool.query(query, [id]);
    if (result.command === "DELETE" && result.rowCount) {
        return `Deleted ${result.rowCount} items.`
    }
    return null;
}

export const deleteMultipleItems = async (idList: number[]): Promise<string | null> => {
    const query = 'DELETE FROM shopping_items WHERE id = ANY($1::int[])';

    const result = await pool.query(query, [idList]);
    if (result.command === "DELETE" && result.rowCount) {
        return `Deleted ${result.rowCount} items.`
    }
    return null;
}