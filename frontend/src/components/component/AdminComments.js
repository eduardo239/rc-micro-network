import React from 'react';

const AdminComments = ({ comments }) => {
  return (
    <>
      <h3>Comments</h3>
      <table>
        <thead>
          <tr>
            <th>content</th>
          </tr>
        </thead>
        <tbody>
          {comments &&
            comments.map((u) => (
              <tr key={u._id}>
                <td>{u.content}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminComments;
