import React from 'react';
import PropTypes from 'prop-types';
import ContactPreview from './ContactPreview';
import IconEdit from './components/icons/IconEdit.jsx';


function ContactList({
  contacts,
  selectedEmail,
  composeEmail,
  draftEmail,
  setSelectedContact,
}) {

  const handleEmailSelect = (contact) => {
    setSelectedContact(contact);
  };

  const handleComposeEmail = () => {
    composeEmail();
  };

  return (
    <div className="email-list-view">
      <section className="title-container">
        <p className="title">Contacts</p>
        <button
          className="primary small"
          onClick={handleComposeEmail}
          disabled={draftEmail?.isOpen}
        >
          <IconEdit />
          Send Email Template
        </button>
      </section>
      <section className="email-list-container">
        {contacts.length === 0 ? (
          <p>Loading emails.</p>
        ) : (
          <ul className="email-list">
            {contacts.map((contact) => (
              <div key={contact.id} onClick={() => handleEmailSelect(contact)}>
                <ContactPreview
                  contact={contact}
                  thread={contact}
                  selected={selectedEmail?.id === contact.id}
                />
              </div>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

ContactList.propTypes = {
  emails: PropTypes.array.isRequired,
  selectedEmail: PropTypes.object,
  setSelectedEmail: PropTypes.func,
  composeEmail: PropTypes.func.isRequired,
  draftEmail: PropTypes.object,
  setDraftEmail: PropTypes.func.isRequired,
};

export default ContactList;
