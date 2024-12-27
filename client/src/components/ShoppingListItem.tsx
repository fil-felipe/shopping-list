import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios, {AxiosResponse} from "axios";

import {Box, Button, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DeleteIcon from '@mui/icons-material/Delete';

import {ListProps} from '../pages/ShoppingLists';
import LoadingSpinner from './LoadingSpiner';

interface ShoppingListItemProps {
  listItem: ListProps;
  refreshLists: () => void;
}

const apiUrl = process.env.REACT_APP_API_URL;

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({listItem, refreshLists}) => {
  const [loading, setLoading] = useState(false);
  const [visiblePopUp, setVisiblePopUp] = useState(false);

  const handleDeleteClick = async() => {
    setVisiblePopUp(true);
  }

  const handleClose = () => {
    setVisiblePopUp(false);
  }

  const handleSubmitDelete = async() => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.delete(`${apiUrl}/api/shopping-list/${listItem.id}`);
      
      if (response.status.toString()[0] !== "2") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      refreshLists();
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
    }
  setVisiblePopUp(false);
  setLoading(false);
  }
    return (
        <ListItem >
          <Box component={Link} to={`/${listItem.id}`} sx={{ display: 'flex', gap: 2 }}>
            <ListItemIcon>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%', // Zaokrąglenie
                  backgroundColor: '#f0f0f0', // Jasnoszare tło dla ikony
                }}
              >
                <ShoppingBasketIcon />
              </Box>
            </ListItemIcon>
            <ListItemText primary={listItem.name} />
          </Box>
          <Box sx={{ display: 'flex', padding: 2 }}>
          <ListItemIcon onClick={handleDeleteClick} role="button">
                <DeleteIcon color="error"/>
          </ListItemIcon>
          </Box>
          <Dialog open={visiblePopUp} onClose={handleClose}>
                <DialogTitle>Potwierdź usunięcie</DialogTitle>
                <DialogContent>
                    <DialogContentText>Czy na pewno chcesz usunąć listę {listItem.name}?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Anuluj</Button>
                    <Button onClick={handleSubmitDelete} color="error">Usuń</Button>
                </DialogActions>
            </Dialog>
            <LoadingSpinner isOpen={loading}/> 
        </ListItem>
    )
}

export default ShoppingListItem;