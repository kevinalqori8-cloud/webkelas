// src/components/ChatAnonim.jsx

import React, { useState, useEffect, useRef } from 'react';
import './ChatAnonim.css'; // Pastikan path ini benar

// Fungsi helper untuk membuat username acak
const getRandomUsername = () => `Anon${Math.floor(Math.random() * 10000)}`;

const ChatAnonim = () => {
  const [messages, setMessages] = useState([
    // Pesan awal untuk demo
    { id: 1, sender: 'other', text: 'Halo, ada orang?', timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [myUsername] = useState(getRandomUsername());
  const [otherUsername] = useState(getRandomUsername());
  const [isTyping, setIsTyping] = useState(false);

  // Ref untuk auto-scroll ke pesan terakhir
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect untuk auto-scroll setiap kali ada pesan baru
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fungsi untuk mengirim pesan
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(), // ID unik sementara
      sender: 'me',
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');

    // Simulasi balasan dari 'other'
    simulateReply();
  };

  // Fungsi untuk mensimulasikan balasan
  const simulateReply = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        'Iya, ada kok.',
        'Lagi ngapain?',
        'Oh, begitu.',
        'Wah, seru.',
        'Hmm, saya setuju.',
      ];
      const replyText = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMessage = {
        id: Date.now(),
        sender: 'other',
        text: replyText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 2000 + Math.random() * 2000); // Balasan acak antara 2-4 detik
  };

  // Fungsi untuk memformat timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        {otherUsername}
      </header>

      <main className="messages-list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender === 'me' ? 'message-sent' : 'message-received'}`}
          >
            <div className="message-bubble">{msg.text}</div>
            <span className="message-timestamp">{formatTime(msg.timestamp)}</span>
          </div>
        ))}
        {isTyping && <div className="typing-indicator">{otherUsername} sedang mengetik...</div>}
        {/* Elemen dummy untuk di-scroll oleh ref */}
        <div ref={messagesEndRef} />
      </main>

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder="Ketik pesan..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="send-button">
          {/* Ikon kirim (bisa diganti dengan SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatAnonim;
