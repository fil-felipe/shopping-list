import React from 'react';
import { Link } from 'react-router-dom';

import {Box, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import {ListProps} from '../pages/ShoppingLists';



const ShoppingListItem: React.FC<ListProps> = (listItem) => {
    return (
        <ListItem component={Link} to={`/${listItem.id}`}>
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
        </ListItem>
    )
}

export default ShoppingListItem;