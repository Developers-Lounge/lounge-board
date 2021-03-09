import { genSalt, hash, compare } from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const comparePasswords = (password: string, actualHashed: string) =>
  compare(password, actualHashed);
