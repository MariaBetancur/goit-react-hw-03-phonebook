import React, { Component } from 'react';
import './App.css';
import ContactForm from './Form/ContactForm';
import Contact from './Contact/contact';
import Filter from './Filter/filter';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { Container, PhonebookTitle, ContactTitle } from './App.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (this.state.contacts.find(contact => contact.name === name)) {
      toast.error(`${name} is already in contact`);
      return null;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
    toast.success(`Contact ${name} Successfully created!`);
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  componentDidMount() {
    console.log('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitContactHandle = data => {};

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const filtredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <Container>
        <PhonebookTitle>PhoneBook</PhonebookTitle>
        <ContactForm submitForm={this.addContact} />
        <ContactTitle>Contacts</ContactTitle>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <Contact
          contacts={filtredContacts}
          onDeleteContact={this.deleteContact}
        />
        <Toaster />
      </Container>
    );
  }
}

export default App;
// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
