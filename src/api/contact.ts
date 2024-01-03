import {AxiosResponse} from 'axios';
import {axiosInstance} from '../utils/axiosInstance';
import {MutateOptions} from '@tanstack/react-query';

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  isFavorite: boolean;
};

export const getContacts = async () => {
  try {
    const response: AxiosResponse<Contact[]> = await axiosInstance.get(
      '/contact',
    );
    return response.data;
  } catch (error) {
    console.error('Error while fetching contacts:', error);
    throw new Error('Error while fetching contacts');
  }
};

export const addContact = async (input: Contact) => {
  try {
    const response: AxiosResponse<Contact> = await axiosInstance.post(
      '/contact',
      input,
    );
    return response.data;
  } catch (error) {
    console.error('Error while adding contact:', error);
    throw new Error('Error while adding contact');
  }
};

export const editContact = async (input: Contact) => {
  try {
    const response: AxiosResponse<Contact> = await axiosInstance.put(
      `/contact/${input.id}`,
      input,
    );
    return response.data;
  } catch (error) {
    console.error('Error while editing contact:', error);
    throw new Error('Error while editing contact');
  }
};

export const deleteContact = async (id: number) => {
  try {
    const response: AxiosResponse<Contact> = await axiosInstance.delete(
      `/contact/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error while deleting contact:', error);
    throw new Error('Error while deleting contact');
  }
};

export const favoriteStatusContact = async ({
  id,
  isFavorite,
}: MutateOptions<Contact, Error, number, unknown> & {
  id: number;
  isFavorite: boolean;
}) => {
  try {
    const response: AxiosResponse<Contact> = await axiosInstance.patch(
      `/contact/${id}`,
      {isFavorite: !isFavorite},
    );

    return response.data;
  } catch (error) {
    console.error('Error while updating contact status:', error);
    throw new Error('Error while updating contact status');
  }
};
