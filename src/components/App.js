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
		// console.log('localStorage >>', localStorage.getItem('contacts'));
		// console.log('contactsData >>', contactsData);
		// console.log('?? >>', JSON.parse(localStorage.getItem('contacts')) ?? contactsData );
    setContacts(initial);
  }, []);

  useEffect(() => {
		if(contacts.length === 0) return;
		// console.log('didUpdate 0 >>', contacts);
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
		// console.log('didUpdate 1 >>', contacts);
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

    setContacts( prevState => ([...prevState, newContact]));
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



// **************** Старий код
// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const initial =
//       JSON.parse(localStorage.getItem('contacts')) ?? contactsData;
//     this.setState({ contacts: initial });
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (prevState.contacts !== this.state.contacts) {
//       console.log(`${prevState.contacts} >> ${this.state.contacts}`);

//       const stringifiedContacts = JSON.stringify(this.state.contacts);
//       localStorage.setItem('contacts', stringifiedContacts);
//     }
//   }

// addContacts = newContact => {
//   if (
//     this.state.contacts.some(
//       stateContact => stateContact.userName === newContact.userName
//     )
//   ) {
//     alert(`${newContact.userName} is already in contacts.`);
//     return;
//   }

//   this.setState(prevState => ({
//     contacts: [...prevState.contacts, newContact]
//   }));
//   // // or:
//   // this.setState(prevState => {
//   //   return { contacts: [...prevState.contacts, newContact] };
//   // });
//   // // or:
//   // this.setState({
//   //   contacts: [...this.state.contacts, newContact],
//   // });
// };

// filterChange = evt => {
//   const { name, value } = evt.target;
//   this.setState({ [name]: value });
// };

// deleteContact = evt => {
//   this.setState({
//     contacts: this.state.contacts.filter(
//       contact => contact.id !== evt.target.id
//     ),
//   });
// };

// render() {
//   const filterContact = this.state.contacts.filter(contact =>
//     contact.userName
//       .toLowerCase()
//       .trim()
//       .includes(this.state.filter.toLocaleLowerCase())
//   );
//   // console.log(this.state);

//   return (
//     <Box>
//       <h1>Phonebook</h1>
//       <ContactForm addContacts={this.addContacts} />

//       <h2>Contacts</h2>
//       <Filter
//         filterValue={this.state.filter}
//         filterChange={this.filterChange}
//       />
//       <ContactList
//         contacts={filterContact}
//         deleteContact={this.deleteContact}
//       />
//     </Box>
//   );
// }
// }


// ******************* GPT
// import React, { useState, useEffect } from 'react';
// import { Box } from "./Styled";
// import { ContactForm } from './ContactForm/ContactForm';
// import { ContactList } from './ContactList/ContactList';
// import { Filter } from './Filter/Filter';

// import contactsData from '../data/default-contacts.json';

// export const App = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     const initial =
//       JSON.parse(localStorage.getItem('contacts')) ?? contactsData;
//     setContacts(initial);
//   }, []);

//   useEffect(() => {
//     console.log(`Contacts updated:`, contacts);

//     const stringifiedContacts = JSON.stringify(contacts);
//     localStorage.setItem('contacts', stringifiedContacts);
//   }, [contacts]);

//   const addContacts = newContact => {
//     if (
//       contacts.some(stateContact => stateContact.userName === newContact.userName)
//     ) {
//       alert(`${newContact.userName} is already in contacts.`);
//       return;
//     }

//     setContacts(prevContacts => ([...prevContacts, newContact]));
//   };

//   const handleFilterChange = evt => {
//     const { value } = evt.target;
//     setFilter(value);
//   };

//   const deleteContact = id => {
//     setContacts(prevContacts => (
//       prevContacts.filter(contact => contact.id !== id)
//     ));
//   };

//   const filterContacts = contacts.filter(contact =>
//     contact.userName
//       .toLowerCase()
//       .trim()
//       .includes(filter.toLocaleLowerCase())
//   );

//   return (
//     <Box>
//       <h1>Phonebook</h1>
//       <ContactForm addContacts={addContacts} />

//       <h2>Contacts</h2>
//       <Filter filterValue={filter} filterChange={handleFilterChange} />
//       <ContactList contacts={filterContacts} deleteContact={deleteContact} />
//     </Box>
//   );
// };