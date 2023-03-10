// // npm i nanoid
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { AddUserForm, Button } from './Styled';

const INITIAL_STATE = {
  userName: '',
  userNumber: '',
};

export const ContactForm = ({ addContacts }) => {
  const [user, setUser] = useState(INITIAL_STATE);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newUser = {
      id: nanoid(),
      userName: user.userName,
      userNumber: user.userNumber,
    };
    addContacts(newUser);
    reset();
  };

  const reset = () => {
    setUser({ ...INITIAL_STATE });
  };

  return (
    <AddUserForm onSubmit={handleSubmit}>
      <label>
        Name &nbsp;
        <input
          type="text"
          placeholder="Enter name"
          name="userName"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={user.userName}
          onChange={handleChange}
        />
      </label>

      <label>
        Number &nbsp;
        <input
          type="tel"
          placeholder="Enter tel"
          name="userNumber"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={user.userNumber}
          onChange={handleChange}
        />
      </label>

      <Button type="submit">Add contact</Button>
    </AddUserForm>
  );
};
