import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123123', 9),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@admin.com',
    password: bcrypt.hashSync('123123', 9),
  },
  {
    name: 'Jane Doe',
    email: 'jane@admin.com',
    password: bcrypt.hashSync('123123', 9),
  },
];

export default users;
