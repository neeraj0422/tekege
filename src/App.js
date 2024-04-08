import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import MyListsPage from './MyListsPage';
import MyTodoListPage from './MyTodoListPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lists" element={<MyListsPage />} />
        <Route path="/lists/:listId" element={<MyTodoListPage />} />
      </Routes>
    </Router>
  );
};

export default App;