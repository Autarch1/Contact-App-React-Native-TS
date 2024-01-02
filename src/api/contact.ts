import { Axios, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axiosInstance";

export type Contact = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export const getContacts = async () =>{
    try{
    const response: AxiosResponse<Contact[]> = await axiosInstance.get('/contact')
    return response.data
    }catch(error){
        console.error("Error while fetching contacts:", error);
        throw new Error("Error while fetching contacts");     
    }
}

export const addContact = async (input : Contact) =>{
    try {
        const response: AxiosResponse<Contact> = await axiosInstance.post('/contact', input)
        return response.data
    }catch(error){
        console.error("Error while adding contact:", error);
        throw new Error("Error while adding contact");
    }
}

export const editContact = async (input : Contact) =>{
    try {
        const response: AxiosResponse<Contact> = await axiosInstance.put(`/contact/${input.id}`, input)
        return response.data
    }catch(error){
        console.error("Error while editing contact:", error);
        throw new Error("Error while editing contact");
    }
}

