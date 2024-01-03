import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface Contact {
    id : number,
    name : string,
    email : string,
    phone : string,
    address : string,
    isFavorite : boolean
}

const initialState : Contact[] = [];

const contactSlice = createSlice({
    name : 'contact',
    initialState,
    reducers : {
        addContact : (state, action : PayloadAction<Contact>) =>{ 
            state = [...state, action.payload]
            return state
        },
        deleteContact : (state, action : PayloadAction<number>) => {
            state = state.filter(contact => contact.id !== action.payload)
            return state
        },
        updateContact : (state, action : PayloadAction<Contact>) => {
            state = state.map(contact => contact.id === action.payload.id ? action.payload : contact)
            return state
        }
    }
})

export const { addContact, deleteContact, updateContact } = contactSlice.actions
export default contactSlice.reducer
