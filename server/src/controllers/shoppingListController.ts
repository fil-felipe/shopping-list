import { Request, Response } from 'express';
import { createShoppingList, getShoppingLists, getShoppingList, updateShoppingList, deleteShoppingList } from '../models/shoppingListModel';

interface errorItem {
    message?: string
}

export const createShoppingListHandler = async (req: Request, res: Response ) => {
    try {
        const { name } = req.body;
        const newShoppingList = await createShoppingList(name);
        res.status(201).json(newShoppingList);
    } catch (error) {
        const e = error as Error;
        res.status(400).json({ message: e.message })
    }
}

export const getShoppingListsHandler = async (req: Request, res: Response) => {
    try {
        const shoppingList = await getShoppingLists();
        res.status(200).json(shoppingList);
    } catch(error) {
        const e = error as Error;
        res.status(400).json({ message: e.message});
    }
}

export const getShoppingListHandler = async (req: Request, res: Response) => {
    try {
        const shoppingList = await getShoppingList(parseInt(req.params.id));
        if (!shoppingList) {
            res.status(404).json({ message: 'Shopping list not found'});
            return
        }
        res.status(200).json(shoppingList);
    } catch(error) {
        const e = error as Error;
        res.status(400).json({ message: e.message});
    }
}

export const updateShoppingListHandler = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const shoppingList = await updateShoppingList(parseInt(req.params.id), name);
        if (!shoppingList) {
            res.status(404).json({ message: "Shopping list not found"});
            return
        }
        res.status(200).json(shoppingList);
    } catch (error) {
        const e = error as Error;
        res.status(400).json({ message: e.message });
    }
}

export const deleteShoppingListHandler = async (req: Request, res: Response) => {
    try {
        const shoppingList = await deleteShoppingList(parseInt(req.params.id));
        if (!shoppingList) {
            res.status(404).json({ message: "Shopping list not found"});
            return
        }
        res.status(200).json({ message: 'Item deleted'});
    } catch (error) {
        const e = error as Error;
        res.status(400).json({ message: e.message })
    }
}