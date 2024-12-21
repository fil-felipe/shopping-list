import React, { useEffect, useState } from 'react';
import axios, {AxiosResponse} from "axios";

import { Grid2, Box, List } from '@mui/material';

import ListHeader from '../components/ListHeader';
import ShoppingListItem from '../components/ShoppingListItem';
import AddList from '../components/AddList';

export interface ListProps {
  id: number;
  name: string;
} 

const apiUrl = process.env.REACT_APP_API_URL;

const ShoppingLists: React.FC = () => {
  const [allLists, setAllLists] = useState<ListProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(`${apiUrl}/api/shopping-list`);
        if (response.status.toString()[0] !== "2") {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setAllLists(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchData();
  }, [refreshTrigger]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!allLists) {
    return <p>Loading...</p>;
  }

  const refreshLists = () => {
    setRefreshTrigger((prev) => !prev);
  }

  return (
    <Grid2
      container
      direction="column"
      justifyContent="center"  // Wyśrodkowanie poziome
      alignItems="center"       // Wyśrodkowanie pionowe
      sx={{ height: '100vh' }}   // Pełna wysokość okna
    >
      <ListHeader title="Twoje listy" />
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <List>
        {allLists.map((item) => (
          <ShoppingListItem key={item.id} {...item}/>
        ))}
      </List>
    </Box>

      <AddList refreshLists={refreshLists}/>
    </Grid2>
  );
};

export default ShoppingLists;
