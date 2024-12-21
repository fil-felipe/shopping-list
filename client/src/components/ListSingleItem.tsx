import React from 'react';
import axios, {AxiosResponse} from "axios";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import DeleteItem from './DeleteItem';
import { ItemProps } from '../pages/ShoppingItems';

interface ListSingleItemProps {
    listItem: ItemProps;
    refreshList: () => void;
}

const apiUrl = process.env.REACT_APP_API_URL;

const ListSingleItem: React.FC<ListSingleItemProps> = ({listItem, refreshList}) => {
    const handleBuyClick = async() => {
        try {
            
            listItem.bought = !listItem.bought;
            const response: AxiosResponse = await axios.put(`${apiUrl}/api/shopping-item/${listItem.id}`,{...listItem});
            
            if (response.status.toString()[0] !== "2") {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            refreshList();
            } catch (err) {
                console.error(err instanceof Error ? err.message : 'Unknown error');
            }
    }

    return (
        <ListItem key={listItem.id}>
            <ListItemText primary={listItem.item_name} secondary={listItem.item_category? listItem.item_category : "Missing category"} />
            <ListItemIcon onClick={handleBuyClick} role="button">
                <ShoppingBasketIcon color={listItem.bought? "error" : "success"}/>
            </ListItemIcon>
            < DeleteItem key={listItem.id} listItem={listItem} refreshList={refreshList} />
        </ListItem>
    )
}

export default ListSingleItem;