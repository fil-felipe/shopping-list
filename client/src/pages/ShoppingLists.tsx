import React, { useEffect, useState } from 'react';
import axios, {AxiosResponse} from "axios";

interface ListProps {
  id: number;
  name: string;
} 

const ShoppingLists: React.FC = () => {
  const [allLists, setAllLists] = useState<ListProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get('http://localhost:5000/api/shopping-list');
        if (response.status != 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setAllLists(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!allLists) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Twoje listy</h1>
      <ul>
        {allLists.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingLists;
