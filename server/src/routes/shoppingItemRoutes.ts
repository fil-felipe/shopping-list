import { Router } from 'express';
import { createShoppingItemtHandler, getAllListItemsHandler, getSingleItemHandler, updateSingleItemHandler, deleteSingleItemHandler, deleteMultipleItemsmHandler } from '../controllers/shoppingItemController';

const router = Router();

router.post('/:listId', createShoppingItemtHandler);

router.get('/list/:listId', getAllListItemsHandler);

router.get('/:id', getSingleItemHandler);

router.put('/:id', updateSingleItemHandler);

router.delete('/:id', deleteSingleItemHandler);

router.delete('/', deleteMultipleItemsmHandler);

export default router;