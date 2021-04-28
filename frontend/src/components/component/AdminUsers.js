import React from 'react';

const AdminUsers = ({ users }) => {
  return (
    <>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u) => (
              <tr key={u._id}>
                <td>{u._id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminUsers;
