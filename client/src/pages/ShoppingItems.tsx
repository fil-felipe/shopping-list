import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios, {AxiosResponse} from "axios";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { Button } from '@mui/material';

import ListSingleItem from '../components/ListSingleItem';
import ListHeader from '../components/ListHeader';
import AddItem from '../components/AddItem';

export interface ItemProps {
  id: number;
  list_id: number;
  item_name: string;
  item_category?: string | null;
  bought?: boolean;
}

const apiUrl = process.env.REACT_APP_API_URL;

const ShoppingItems: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const [listName, setListName] = useState("");
  const [allItems, setAllItems] = useState<ItemProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListName = async () => {
      try {
        const response: AxiosResponse = await axios.get(`${apiUrl}/api/shopping-list/${listId}`);
        
        if (response.status.toString()[0] !== "2") {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const name = await response.data.name;
        setListName(name);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchListName();
  }, []);

  useEffect(() => {
    const fetchListItems = async () => {
      try {
        const response: AxiosResponse = await axios.get(`${apiUrl}/api/shopping-item/list/${listId}`);
        
        if (response.status.toString()[0] !== "2") {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ItemProps[] = await response.data;
        setAllItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchListItems();
  }, [refreshTrigger, listId]);

  const refreshList = () => {
    setRefreshTrigger((prev) => !prev);
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!allItems) {
    return <p>Loading...</p>;
  }

  const handleToLists = () => {
    navigate('/');
  }

  return (
    <div>
      < ListHeader title={`Produkty dla listy ${listName}`} />
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {listId && < AddItem listId={listId} refreshList={refreshList}/>}
      </Box>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <List 
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="to-buy-list-subheader"
        subheader={
          <ListSubheader component="div" id="to-buy-list-subheader">
            Do kupienia
          </ListSubheader>
        }
      >
        {allItems
          .filter(item => item.bought === false) 
          .map((item) => (
          <ListSingleItem 
            key={item.id}
            listItem={item as ItemProps} 
            refreshList={refreshList}
          />
        ))}
      </List>
      </Box>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <List 
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="to-buy-list-subheader"
        subheader={
          <ListSubheader component="div" id="to-buy-list-subheader">
            Kupione
          </ListSubheader>
        }
      >
        {allItems
          .filter(item => item.bought === true) 
          .map((item) => (
          <ListSingleItem 
            key={item.id}
            listItem={item as ItemProps} 
            refreshList={refreshList}
          />
        ))}
      </List>
      </Box>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleToLists}
        >
          Wróć do spisu list
        </Button>
      </Box>
      </Box>
    </div>
  );
};

export default ShoppingItems;
