import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const TodoListPage = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodoItem, setNewTodoItem] = useState({
    title: '',
    description: '',
    labelColour: '',
    done: false,
  });

  const fetchTodoItems = async () => {
    try {
      const bearerToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzQGdtYWlsLmNvbSIsImV4cCI6MTcxMzM2ODg2Mn0.Zl0zNprA3WiQR-3LfEMBPaIL5bMnnRgiqwrD-jysBBYsjvPahgsi7wcnTcxTF8ibqWv-UqbaD13fPdMwAbKI6g';
      const response = await axios.get('http://todo-api.aavaz.biz/todos', {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Accept': 'application/json',
        },
      });
      setTodoItems(response.data.content);
    } catch (error) {
      console.error('Error fetching todo items:', error);
      alert('An error occurred while fetching your todo items. Please try again later.');
    }
  };

  useEffect(() => {
    fetchTodoItems();
  }, []);

  const handleCreateTodo = async () => {
    try {
      const bearerToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzQGdtYWlsLmNvbSIsImV4cCI6MTcxMzM2ODg2Mn0.Zl0zNprA3WiQR-3LfEMBPaIL5bMnnRgiqwrD-jysBBYsjvPahgsi7wcnTcxTF8ibqWv-UqbaD13fPdMwAbKI6g';
      await axios.post('http://todo-api.aavaz.biz/todos', newTodoItem, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
      });
      setIsModalOpen(false);
      setNewTodoItem({
        title: '',
        description: '',
        labelColour: '',
        done: false,
      });
      await fetchTodoItems(); // Refresh the todo list
    } catch (error) {
      console.error('Error creating todo item:', error);
      alert('An error occurred while creating a new todo item. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={() => setIsModalOpen(true)}>Create New Todo</button>
      {todoItems.map((item) => (
        <div key={item.todoId}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>Label Color: {item.labelColour}</p>
          <p>Done: {item.done ? 'Yes' : 'No'}</p>
          {/* <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(item.updatedAt).toLocaleString()}</p> */}
        </div>
      ))}

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Create New Todo</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTodoItem.title}
          onChange={(e) => setNewTodoItem({ ...newTodoItem, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTodoItem.description}
          onChange={(e) => setNewTodoItem({ ...newTodoItem, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Label Color"
          value={newTodoItem.labelColour}
          onChange={(e) => setNewTodoItem({ ...newTodoItem, labelColour: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={newTodoItem.done}
            onChange={(e) => setNewTodoItem({ ...newTodoItem, done: e.target.checked })}
          />
          Done
        </label>
        <button onClick={handleCreateTodo}>Create</button>
      </Modal>
    </div>
  );
};

export default TodoListPage;