import bcrypt from 'bcryptjs';

// TODO: check if salt works
const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123123', process.env.B_SALT),
    isAdmin: true,
    avatar: 'https://dummyimage.com/100x100/555/000.jpg',
    friends: [],
    posts: [],
  },
  {
    name: 'John Doe',
    email: 'john@admin.com',
    password: bcrypt.hashSync('123123', process.env.B_SALT),
    avatar: 'https://dummyimage.com/100x100/555/000.jpg',
    friends: [],
    posts: [],
  },
  {
    name: 'Jane Doe',
    email: 'jane@admin.com',
    password: bcrypt.hashSync('123123', process.env.B_SALT),
    avatar: 'https://dummyimage.com/100x100/555/000.jpg',
    friends: [],
    posts: [],
  },
];

export default users;
