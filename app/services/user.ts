import { BookDocument } from '../api/models/Book';
import { UserDocument } from '../api/models/User';

import { api } from './api';

type CreateUserPayload = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export const getUserBooks = async (
  user_email: string,
): Promise<{ user: UserDocument; userBooks: BookDocument[] }> => {
  return api
    .get(`/user/${user_email}`)
    .then(({ data }) => data)
    .catch((error) => error);
};

export const createOrFindUser = async (
  payload: CreateUserPayload,
): Promise<UserDocument> => {
  return api
    .post('/user', payload)
    .then(({ data }) => data?.user)
    .catch((error) => error);
};

export const desactiveUser = async (
  user_email: string,
): Promise<{ ok: boolean }> => {
  return api
    .delete(`/user/${user_email}`)
    .then(({ data }) => data)
    .catch((error) => error);
};
