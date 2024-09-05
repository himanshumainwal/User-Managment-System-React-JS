import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserForm = ({ users, setUsers }) => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const existingUser = users.find(u => u.id === parseInt(id));
      if (existingUser) {
        setUser(existingUser);
      } else {
        setError('User not found');
      }
    }
  }, [id, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) { 
      axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
        .then(response => {
          const updatedUsers = users.map(u => u.id === parseInt(id) ? response.data : u);
          setUsers(updatedUsers);
          navigate('/');
        })
        .catch(() => setError('Failed to update user'));
    } else { 
      axios.post('https://jsonplaceholder.typicode.com/users', user)
        .then(response => {
          const newUser = { ...response.data, id: users.length + 1 };
          setUsers([...users, newUser]);
          navigate('/');
        })
        .catch(() => setError('Failed to add user'));
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit User' : 'Add User'}</h2>
      {error && <p className="text-red-500 text-3xl">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Phone</label>
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {id ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
