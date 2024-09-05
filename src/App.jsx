import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';
import Header from './components/Header';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl underline underline-offset-auto font-bold text-center mt-3 mb-6">User Management System</h1>
        {loading && <p className="text-center text-3xl">Loading...</p>}
        {error && <p className="text-red-500 text-3xl text-center">{error}</p>}
        <Routes>
          <Route path="/" element={<UserList users={users} setUsers={setUsers} />} />
          <Route path="/add-user" element={<UserForm users={users} setUsers={setUsers} />} />
          <Route path="/edit-user/:id" element={<UserForm users={users} setUsers={setUsers} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
