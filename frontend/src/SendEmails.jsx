import { useNylas } from '@nylas/nylas-react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconDelete from './components/icons/IconDelete.jsx';
import BookAppointmentReminder from './emailTemplates/book-appointment-reminder';
import { render as EmailRender } from '@react-email/render';

function SendEmails({
  userId,
  draftEmail,
  setDraftEmail,
  onEmailSent,
  setToastNotification,
  discardComposer,
  style,
  selectedContact,
}) {
  const nylas = useNylas();

  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if(!selectedContact) return;
    setTo(selectedContact.emails[0].email)
    setSubject(`Book your next ${selectedContact.service_completed_recently} appointment!`);
    setBody(EmailRender(<BookAppointmentReminder 
      username={selectedContact.given_name}
      service={selectedContact.service_completed_recently}
      preferredDay={selectedContact.preferred_appointment}
      teamName={selectedContact.service_provider}
      companyName='One Body Therapy'
    />));
  }, [selectedContact]);

  useEffect(() => {
    const updateTimer = setTimeout(function () {
      const currentDate = new Date();
      const draftUpdates = {
        to: to,
        subject,
        body,
        last_message_timestamp: Math.floor(currentDate.getTime() / 1000),
      };
      setDraftEmail(draftUpdates);
    }, 500);
    return () => clearTimeout(updateTimer);
  }, [to, subject, body]);

  const sendEmail = async ({ userId, to, body }) => {
    try {
      const url = nylas.serverBaseUrl + '/nylas/send-email';

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: userId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...draftEmail, to, subject, body }),
      });

      if (!res.ok) {
        setToastNotification('error');
        throw new Error(res.statusText);
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.warn(`Error sending emails:`, error);
      setToastNotification('error');

      return false;
    }
  };

  const send = async (e) => {
    e.preventDefault();

    if (!userId) {
      return;
    }
    setIsSending(true);
    const message = await sendEmail({ userId, to, body });
    console.log('message sent', message);
    setIsSending(false);
    onEmailSent();
  };

  const render = selectedContact 
    ? <BookAppointmentReminder 
        username={selectedContact.given_name}
        service={selectedContact.service_completed_recently}
        preferredDay={selectedContact.preferred_appointment}
        teamName={selectedContact.service_provider}
        companyName='One Body Therapy'
      />
    : <BookAppointmentReminder />
    
  return (
    <>
      <div className="input-container">
        {render}
        <button
          onClick={send}
          className={`primary ${style}`}
          disabled={!to || !body || isSending}
          type="submit"
        >
          {isSending ? 'Sending...' : 'Send email to all Contacts!'}
        </button>
        <button className="icon" onClick={discardComposer}>
          <IconDelete />
        </button>
      </div>
      
    </>
  );
}

SendEmails.propTypes = {
  userId: PropTypes.string.isRequired,
  draftEmail: PropTypes.object.isRequired,
  setDraftEmail: PropTypes.func.isRequired,
  onEmailSent: PropTypes.func.isRequired,
  setToastNotification: PropTypes.func.isRequired,
  discardComposer: PropTypes.func.isRequired,
  style: PropTypes.string,
};

export default SendEmails;
