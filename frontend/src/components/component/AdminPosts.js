import React from 'react';

const AdminPosts = ({ posts }) => {
  return (
    <>
      <h3>Posts</h3>
      <table>
        <thead>
          <tr>
            <th>content</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((u) => (
              <tr key={u._id}>
                <td>{u.content}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminPosts;
