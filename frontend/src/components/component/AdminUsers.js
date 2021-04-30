import React from 'react';

import { ReactComponent as DeleteIcon } from '../../assets/ico/white/carbon_delete.svg';

import { useDispatch } from 'react-redux';
import { delete_user } from '../../store/user';

const AdminUsers = ({ users }) => {
  const [message, setMessage] = React.useState('');

  const dispatch = useDispatch();

  const deleteUserHandler = (id) => {
    setMessage('');
    (async () => {
      const response = dispatch(delete_user(id));
      if (response) setMessage('User deleted.');
      setTimeout(() => setMessage(''), 2000);
    })();
  };

  return (
    <>
      <h3>Users</h3>
      {message && <p className='App-message App-message-error'>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u) => (
              <tr key={u._id}>
                <td>{u._id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    onClick={() => deleteUserHandler(u._id)}
                    className='App-btn-icon-mini'
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminUsers;
