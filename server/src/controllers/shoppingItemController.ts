import { Request, Response } from 'express';
import { createShoppingItem, getAllListItems, getSingleItem, updateSingleItem, deleteSingleItem, deleteMultipleItems } from '../models/shoppingItemModel';

export const createShoppingItemtHandler = async (req: Request, res: Response ) => {
    try {
        const { name, category, bought } = req.body;
        const newItem = await createShoppingItem(parseInt(req.params.listId), name, category, bought);
        res.status(201).json(newItem);
    } catch (error) {
        const e = error as Error;
        res.status(400).json({ message: e.message })
    }
}

export const getAllListItemsHandler = async (req: Request, res: Response) => {
    try {
        const allListItems = await getAllListItems(parseInt(req.params.listId));
        res.status(200).json(allListItems);
    } catch(error) {
        const e = error as Error;
        res.status(400).json({ message: e.message});
    }
}

export const getSingleItemHandler = async (req: Request, res: Response) => {
    try {
        const item = await getSingleItem(parseInt(req.params.id));
        if (!item) {
            res.status(404).json({ message: 'Item not found'});
            return
        }
        res.status(200).json(item);
    } catch(error) {
        const e = error as Error;
        res.status(400).json({ message: e.message});
    }
}

export const updateSingleItemHandler = async (req: Request, res: Response) => {
    try {
        const { name, category, bought } = req.body;
        const updatedItem = await updateSingleItem(parseInt(req.params.id), name, category, bought);
        if (!updatedItem) {
            res.status(404).json({ message: "Item not found"});
            return
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        const e = error as Error;
        res.status(400).json({ message: e.message });
    }
}

export const deleteSingleItemHandler = async (req: Request, res: Response) => {
    try {
        const deletedItem = await deleteSingleItem(parseInt(req.params.id));
        if (!deletedItem) {
            res.status(404).json({ message: "Item not found"});
            return
        }
        res.status(200).json({ message: deletedItem});
    } catch (error) {
        const e = error as Error;
        res.status(400).json({ message: e.message })
    }
}

export const deleteMultipleItemsmHandler = async (req: Request, res: Response) => {
    try {
        const { idList } = req.body;
        const deletedItems = await deleteMultipleItems(idList);
        if (!deletedItems) {
            res.status(404).json({ message: "Item not found"});
            return
        }
        res.status(200).json({ message: deletedItems});
    } catch (error) {
        const e = error as Error;
        res.status(400).json({ message: e.message })
    }
}