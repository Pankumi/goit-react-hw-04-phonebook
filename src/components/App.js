// // npm i nanoid
// // npm i styled-components

import React, { useState, useEffect } from 'react';
import { Box } from './Styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import contactsData from '../data/default-contacts.json';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const initial =
      JSON.parse(localStorage.getItem('contacts')) ?? contactsData;
    setContacts(initial);
  }, []);

  useEffect(() => {
    if (contacts.length === 0) return;
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const addContacts = newContact => {
    if (
      contacts.some(
        stateContact => stateContact.userName === newContact.userName
      )
    ) {
      alert(`${newContact.userName} is already in contacts.`);
      return;
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  const filterChange = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = evt => {
    setContacts(contacts.filter(contact => contact.id !== evt.target.id));
  };

  const filterContact = contacts.filter(contact =>
    contact.userName.toLowerCase().trim().includes(filter.toLocaleLowerCase())
  );

  return (
    <Box>
      <h1>Phonebook</h1>
      <ContactForm addContacts={addContacts} />

      <h2>Contacts</h2>
      <Filter filterValue={filter} filterChange={filterChange} />
      <ContactList contacts={filterContact} deleteContact={deleteContact} />
    </Box>
  );
};
