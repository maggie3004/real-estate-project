import React, { useState, useEffect } from 'react';

const buttonStyle = {
  position: 'fixed',
  bottom: '24px',
  left: '24px',
  zIndex: 1000,
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '56px',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.4)',
  zIndex: 1100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
};

const modalStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '24px',
  minWidth: '320px',
  maxWidth: '500px',
  width: '100%',
  maxHeight: '90vh',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  position: 'relative',
  overflowY: 'auto',
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE and Edge
  WebkitScrollbar: 'none', // Webkit browsers
};

const closeBtnStyle = {
  position: 'absolute',
  top: '8px',
  right: '12px',
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
};

const EnquiryModal = ({ open: controlledOpen, setOpen: setControlledOpen }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = setControlledOpen !== undefined ? setControlledOpen : setInternalOpen;
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Restore background scrolling
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [open]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // TODO: handle form submission (API/email)
    alert('Enquiry submitted!');
    setOpen(false);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      {controlledOpen === undefined && (
        <button style={buttonStyle} onClick={() => setOpen(true)} title="Enquiry">
          ?
        </button>
      )}
      {open && (
        <div style={modalOverlayStyle} onClick={() => setOpen(false)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <button style={closeBtnStyle} onClick={() => setOpen(false)}>&times;</button>
            <h2>Enquiry Form</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', minHeight: '80px' }}
                />
              </div>
              <button type="submit" style={{ background: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EnquiryModal; 