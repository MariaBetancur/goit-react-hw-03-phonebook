import { ContactButton, ContactItem } from './contact.styled';
import PropTypes from 'prop-types';

const Contact = ({ contacts, onDeleteContact }) => (
  <div>
    <ul>
      {contacts.map(({ id, name, number }) => (
        <ContactItem key={id}>
          {name}: {number}
          <ContactButton
            type="button"
            onClick={() => {
              onDeleteContact(id);
            }}
          >
            Delete
          </ContactButton>
        </ContactItem>
      ))}
    </ul>
  </div>
);

export default Contact;

Contact.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
