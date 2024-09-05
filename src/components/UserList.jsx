import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = ({ users, setUsers }) => {
  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(() => {
        alert('Failed to delete user');
      });
  };

  return (
    <div>
      <Link to="/add-user" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 inline-block">Add User</Link>
      <table className="table-auto w-full mt-4 border">
        <thead>
          <tr>
            <th className="px-4 py-2 border-gray-500 border-2">Name</th>
            <th className="px-4 py-2 border-gray-500 border-2">Email</th>
            <th className="px-4 py-2 border-gray-500 border-2">Phone</th>
            <th className="px-4 py-2 border-gray-500 border-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border px-4 py-2 border-gray-500">{user.name}</td>
              <td className="border px-4 py-2 border-gray-500">{user.email}</td>
              <td className="border px-4 py-2 border-gray-500">{user.phone}</td>
              <td className="border px-4 py-2 border-gray-500">
                <Link to={`/edit-user/${user.id}`} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2">Edit</Link>
                <button onClick={() => deleteUser(user.id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
