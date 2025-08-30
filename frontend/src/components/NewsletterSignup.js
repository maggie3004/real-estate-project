import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Integrate with your email marketing provider here
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-center gap-2">
      <input
        type="email"
        className="input flex-1"
        placeholder="Enter your email for updates"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button className="btn btn-primary" type="submit">Subscribe</button>
                      {submitted && <span className="text-gold-600 ml-2">Thank you for subscribing!</span>}
    </form>
  );
};

export default NewsletterSignup; 