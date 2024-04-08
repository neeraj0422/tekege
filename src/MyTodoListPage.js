import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MyTodoListPage = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const { listId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const bearerToken = localStorage.getItem('bearerToken');
        const response = await axios.get(`http://todo-api.aavaz.biz/lists/${listId}/items`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        setTodoItems(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Token might be expired, redirect the user to the login page
          localStorage.removeItem('bearerToken');
          navigate('/login');
        } else {
          console.error('Error fetching todo items:', error);
          alert('An error occurred while fetching your todo items. Please try again later.');
        }
      }
    };
    fetchTodoItems();
  }, [listId, navigate]);

  const handleAddItem = async () => {
    try {
      const bearerToken = localStorage.getItem('bearerToken');
      await axios.post(
        `http://todo-api.aavaz.biz/lists/${listId}/items`,
        { name: newItem },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      setNewItem('');
      // Refresh the list of todo items
      fetchTodoItems();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token might be expired, redirect the user to the login page
        localStorage.removeItem('bearerToken');
        navigate('/login');
      } else {
        console.error('Error adding new item:', error);
        alert('An error occurred while adding a new item. Please try again later.');
      }
    }
  };

  const handleSwapItems = async (item1Id, item2Id) => {
    try {
      const bearerToken = localStorage.getItem('bearerToken');
      await axios.post(
        `http://todo-api.aavaz.biz/lists/${listId}/items/swap`,
        { item1Id, item2Id },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      // Refresh the list of todo items
      fetchTodoItems();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token might be expired, redirect the user to the login page
        localStorage.removeItem('bearerToken');
        navigate('/login');
      } else {
        console.error('Error swapping items:', error);
        alert('An error occurred while swapping items. Please try again later.');
      }
    }
  };

  const fetchTodoItems = async () => {
    try {
      const bearerToken = localStorage.getItem('bearerToken');
      const response = await axios.get(`http://todo-api.aavaz.biz/lists/${listId}/items`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      setTodoItems(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token might be expired, redirect the user to the login page
        localStorage.removeItem('bearerToken');
        navigate('/login');
      } else {
        console.error('Error fetching todo items:', error);
        alert('An error occurred while fetching your todo items. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h1>My Todo List</h1>
      <input type="text" placeholder="New item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      <button onClick={handleAddItem}>Add Item</button>
      {todoItems.map((item) => (
        <div key={item.id}>
          <input type="checkbox" checked={item.completed} />
          {item.name}
          <button onClick={() => handleSwapItems(item.id, item.id - 1)}>Swap Up</button>
          <button onClick={() => handleSwapItems(item.id, item.id + 1)}>Swap Down</button>
        </div>
      ))}
    </div>
  );
};

export default MyTodoListPage;