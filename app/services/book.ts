import { Delta } from 'quill/core';
import { AxiosError } from 'axios';

import { BookDocument } from '../api/models/Book';

import { api } from './api';

type CreateBookPayload = {
  title: string;
  user_email: string;
  description?: string;
  cover?: string;
  content?: Delta;
};

type UpdateBookPayload = {
  title?: string;
  description?: string;
  cover?: string;
  content?: Delta;
};

export const findBooks = async (): Promise<BookDocument[] | AxiosError> => {
  return api
    .get('/book')
    .then(({ data }) => data.books)
    .catch((error) => error);
};

export const findUserBooks = async (
  userEmail: string,
): Promise<BookDocument[]> => {
  return api
    .get(`/book/user/${userEmail}`)
    .then(({ data }) => data.books)
    .catch((error) => error);
};

export const showBook = async (id: string): Promise<BookDocument> => {
  return api
    .get(`/book/${id}`)
    .then(({ data }) => data.book)
    .catch((error) => error);
};

export const createBook = async (
  payload: CreateBookPayload,
): Promise<{ ok: boolean; book: BookDocument }> => {
  return api
    .post('/book', payload)
    .then(({ data }) => data)
    .catch((error) => error);
};

export const updateBook = async (
  id: string,
  data: UpdateBookPayload,
): Promise<{ ok: boolean; book: BookDocument }> => {
  return api
    .put(`/book/${id}`, data)
    .then(({ data }) => data)
    .catch((error) => error);
};

export const uploadBookCover = async (
  id: string,
  data: FormData,
): Promise<{ ok: boolean; book: BookDocument }> => {
  return api
    .patch(`/book/${id}`, data)
    .then(({ data }) => data)
    .catch((error) => error);
};

export const removeBook = async (
  id: string,
): Promise<{ ok: boolean; book: BookDocument }> => {
  return api
    .delete(`/book/${id}`)
    .then(({ data }) => data)
    .catch((error) => error);
};
