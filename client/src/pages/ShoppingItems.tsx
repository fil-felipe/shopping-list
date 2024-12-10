import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, {AxiosResponse} from "axios";

interface ItemProps {
  id: number;
  list_id: number;
  item_name: string;
  item_category?: string | null;
  bought: boolean;
}

const ShoppingItems: React.FC = () => {
const { listId } = useParams();
  const [allItems, setAllItems] = useState<ItemProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(`http://localhost:5000/api/shopping-item/list/${listId}`);
        
        if (response.status != 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ItemProps[] = await response.data;
        setAllItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!allItems) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Twoje listy</h1>
      <ul>
        {allItems.map((item) => (
          <li key={item.id}>{item.item_name} - {item.item_category? item.item_category : "Missing category"}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingItems;
