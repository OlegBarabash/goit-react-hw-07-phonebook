import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { fetchContacts } from './operations';

// const contactsBook = [
//   { id: 1, contactName: 'Oleg', number: '123456789' },
//   { id: 2, contactName: 'Oksana', number: '987456321' },
//   { id: 'id-1', contactName: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', contactName: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', contactName: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', contactName: 'Annie Copeland', number: '227-91-26' },
// ];

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },

  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            contactName: name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const filterRes = {
        items: state.items.filter(cont => cont.id !== action.payload),
      };
      return filterRes;
    },
  },
});

export const { addContact, deleteContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
