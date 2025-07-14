import React, { useState, useRef, useEffect } from 'react';

const FAQS = [
  {
    q: [
      "area", "areas", "location", "locations", "where", "city", "cities", "places",
      "what areas do you have properties in", "where are your properties", "which city are your projects in", "property locations", "project locations", "where are you located", "where are your projects"
    ],
    a: "We have properties in Mumbai (Andheri West) and Bangalore (Whitefield)."
  },
  {
    q: [
      "price", "cost", "2bhk", "3bhk", "flat", "rate", "how much", "what is the price", "what is the cost", "price of 2bhk", "price of 3bhk", "flat price", "flat cost", "how much for a 2bhk", "how much for a 3bhk",
      "what is the price of a 2bhk flat", "what is the price of a 2bhk", "price of a 2bhk flat"
    ],
    a: "Our 2BHK flats in Mumbai start at ₹75 Lakhs. 3BHK in Bangalore starts at ₹1.2 Cr."
  },
  {
    q: [
      "brochure", "download", "pdf", "get brochure", "download brochure", "where can I get the brochure", "how can I download the brochure", "brochure link"
    ],
    a: "Click the 'Download Brochure' button on our website to get the latest PDF."
  },
  {
    q: [
      "contact", "phone", "call", "email", "how can I contact you", "contact number", "how do I reach you", "get in touch", "contact info", "contact information"
    ],
    a: "You can call us at +91-9999999999 or use the contact form on our website."
  },
  {
    q: [
      "amenities", "features", "facilities", "what amenities", "what features", "what facilities", "do you have a gym", "do you have a swimming pool", "clubhouse", "security"
    ],
    a: "Our projects offer modern amenities including a gym, swimming pool, clubhouse, and 24/7 security."
  },
  {
    q: [
      "floor plan", "layout", "plan", "view floor plan", "see floor plan", "download floor plan", "floor plan section", "where can I see the floor plan"
    ],
    a: "You can view and download floor plans from the 'Floor Plan' section of our website."
  },
  {
    q: [
      "about", "company", "builder", "who are you", "about shree ganesh builders", "who is the builder", "company info", "company information", "tell me about your company"
    ],
    a: "Shree Ganesh Builders is a luxury real estate developer with 35+ years of experience and 800+ families served."
  }
];

const FAQ_SUGGESTIONS = [
  "What areas do you have properties in?",
  "What is the price of a 2BHK flat?",
  "How can I download the brochure?",
  "What amenities do you offer?",
  "How can I contact you?"
];

function getSimilarity(a, b) {
  const wa = a.toLowerCase().split(/\W+/);
  const wb = b.toLowerCase().split(/\W+/);
  let match = 0;
  wa.forEach(word => { if (wb.includes(word)) match++; });
  return match / Math.max(wa.length, wb.length);
}

function findBestFaq(input) {
  const normalizedInput = input.trim().toLowerCase();
  // 1. Exact phrase match
  for (let i = 0; i < FAQS.length; i++) {
    for (const keyword of FAQS[i].q) {
      if (normalizedInput === keyword.trim().toLowerCase()) {
        return { idx: i, score: 1, keyword };
      }
    }
  }
  // 2. Fuzzy match fallback
  let best = { idx: -1, score: 0, keyword: null };
  FAQS.forEach((faq, i) => {
    faq.q.forEach(keyword => {
      const score = getSimilarity(input, keyword);
      if (score > best.score) {
        best = { idx: i, score, keyword };
      }
    });
  });
  return best;
}

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am your real estate assistant. Ask me anything about our properties or services.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [loading, typing]);

  const sendMessage = async (customInput) => {
    const text = typeof customInput === 'string' ? customInput : input;
    if (!text.trim()) return;
    const userMessage = { from: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setTyping(true);
    setTimeout(() => {
      const best = findBestFaq(userMessage.text);
      let botMsg;
      if (best.score > 0.55) {
        botMsg = FAQS[best.idx].a;
      } else if (best.score > 0.55) {
        botMsg = `Did you mean: "${FAQS[best.idx].q[0]}"?\n${FAQS[best.idx].a}`;
      } else {
        botMsg = "Sorry, I don't know that. Please contact us at +91-9999999999 or use the contact form for more information.";
      }
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: botMsg }]);
      setLoading(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={styles.widget}>
      <div style={styles.header}>AI Chat Assistant</div>
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.from === 'user' ? styles.userMsg : styles.botMsg}>{msg.text}</div>
        ))}
        {typing && (
          <div style={styles.botMsg}><span className="typing">•••</span></div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.suggestionsRow}>
        {FAQ_SUGGESTIONS.map((q, i) => (
          <button
            key={i}
            style={styles.suggestionBtn}
            onClick={() => sendMessage(q)}
            disabled={loading}
          >
            {q}
          </button>
        ))}
      </div>
      <div style={styles.inputRow}>
        <input
          ref={inputRef}
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          disabled={loading}
        />
        <button style={styles.button} onClick={() => sendMessage()} disabled={loading || !input.trim()}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  widget: {
    position: 'relative',
    width: 340,
    maxWidth: '90vw',
    background: 'rgba(20,20,20,0.98)',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    zIndex: 1000,
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1.5px solid gold',
  },
  header: {
    background: 'linear-gradient(90deg, #222, #444 80%)',
    color: 'gold',
    fontWeight: 700,
    padding: '14px 20px',
    fontSize: 18,
    borderBottom: '1px solid #333',
    letterSpacing: 1,
  },
  messages: {
    flex: 1,
    padding: 16,
    overflowY: 'auto',
    background: 'rgba(30,30,30,0.97)',
    minHeight: 120,
    maxHeight: 260,
  },
  suggestionsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    padding: '8px 12px',
    background: 'rgba(34,34,34,0.95)',
    borderBottom: '1px solid #333',
    borderTop: '1px solid #333',
    justifyContent: 'flex-start',
  },
  suggestionBtn: {
    background: 'rgba(255,215,0,0.12)',
    color: 'gold',
    border: '1px solid gold',
    borderRadius: 8,
    padding: '4px 10px',
    fontSize: 13,
    cursor: 'pointer',
    marginBottom: 2,
    transition: 'background 0.2s, color 0.2s',
    fontWeight: 500,
  },
  userMsg: {
    alignSelf: 'flex-end',
    background: 'linear-gradient(90deg, #333, #222 80%)',
    color: 'white',
    padding: '8px 14px',
    borderRadius: 12,
    margin: '6px 0',
    maxWidth: '80%',
    fontSize: 15,
  },
  botMsg: {
    alignSelf: 'flex-start',
    background: 'rgba(255,215,0,0.08)',
    color: 'gold',
    padding: '8px 14px',
    borderRadius: 12,
    margin: '6px 0',
    maxWidth: '80%',
    fontSize: 15,
  },
  inputRow: {
    display: 'flex',
    borderTop: '1px solid #333',
    background: '#222',
    padding: 10,
  },
  input: {
    flex: 1,
    border: 'none',
    borderRadius: 8,
    padding: '8px 12px',
    fontSize: 15,
    outline: 'none',
    background: '#181818',
    color: 'white',
    marginRight: 8,
  },
  button: {
    background: 'gold',
    color: '#222',
    border: 'none',
    borderRadius: 8,
    padding: '8px 18px',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'background 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
};

export default Chatbot; 