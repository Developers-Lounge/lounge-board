export const user = {
  id: 1,
  username: 'user1',
  email: 'user1@mail.com',
  firstName: 'First',
  lastName: 'Test User',
  password: 'password',
  confirmedAt: new Date(),
  updatedAt: new Date(),
  createdAt: new Date(),
}

export const unconfirmed = {
  id: 2,
  username: 'unconfirmed',
  email: 'unconfirmed@mail.com',
  firstName: 'Unconfirmed',
  lastName: 'Test User',
  password: 'password',
  updatedAt: new Date(),
  createdAt: new Date(),
}

export default [
  user,
  unconfirmed
]
