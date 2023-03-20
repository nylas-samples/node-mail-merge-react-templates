import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ContactPreview({ contact, selected, thread }) {
  if(!contact) return;

  return (
    <li className={`email-preview-container ${selected ? 'selected' : ''}`}>
      <div className="email-content">
        <p className="sender">
          {`${contact.given_name || 'no-given-name'} ${contact.surname || 'no-surname'}`}
          <span className="message-count">
            {thread.messages?.length > 1 ? thread.messages?.length : ''}
          </span>
        </p>
      </div>
    </li>
  );
}

ContactPreview.propTypes = {
  thread: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default ContactPreview;
