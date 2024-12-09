import { Router } from 'express';
import { createShoppingListHandler, getShoppingListsHandler, getShoppingListHandler, updateShoppingListHandler, deleteShoppingListHandler } from '../controllers/shoppingListController';

const router = Router();

router.post('/', createShoppingListHandler);

router.get('/', getShoppingListsHandler);

router.get('/:id', getShoppingListHandler);

router.put('/:id', updateShoppingListHandler);

router.delete('/:id', deleteShoppingListHandler);

export default router;