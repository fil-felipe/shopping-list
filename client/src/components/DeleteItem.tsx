import React, {useState} from 'react';
import axios, {AxiosResponse} from "axios";

import {ListItemIcon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import LoadingSpinner from './LoadingSpiner';
import { ItemProps } from '../pages/ShoppingItems';

interface DeleteItemProps {
    listItem: ItemProps;
    refreshList: () => void;
}

const apiUrl = process.env.REACT_APP_API_URL;

const DeleteItem: React.FC<DeleteItemProps> = ({listItem, refreshList}) => {
    const [visiblePopUp, setVisiblePopUp] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleDeleteClick = () => {
        setVisiblePopUp(true);
    }

    const handleClose = () => {
        setVisiblePopUp(false);
    }

    const handleSubmitDelete = async() => {
        setLoading(true);
        try {
            const response: AxiosResponse = await axios.delete(`${apiUrl}/api/shopping-item/${listItem.id}`);
            
            if (response.status.toString()[0] !== "2") {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            refreshList();
          } catch (err) {
            console.error(err instanceof Error ? err.message : 'Unknown error');
          }
        setVisiblePopUp(false);
        setLoading(false);
    }

    return (
        <div>
            <ListItemIcon onClick={handleDeleteClick} role="button">
                <DeleteIcon color="error"/>
            </ListItemIcon>
            <Dialog open={visiblePopUp} onClose={handleClose}>
                <DialogTitle>Potwierdź usunięcie</DialogTitle>
                <DialogContent>
                    <DialogContentText>Czy na pewno chcesz usunąć {listItem.item_name}?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Anuluj</Button>
                    <Button onClick={handleSubmitDelete} color="error">Usuń</Button>
                </DialogActions>
            </Dialog>
            <LoadingSpinner isOpen={loading}/> 
        </div>
    )
}

export default DeleteItem;