// Contoh komponen TypingGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import './TypingGame.css'; // Sesuaikan path

const TypingGame = () => {
  const sampleText = "The quick brown fox jumps over the lazy dog. Practice makes perfect.";
  const [userInput, setUserInput] = useState('');
  const [time, setTime] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const inputRef = useRef(null);

  // Fungsi untuk memulai game
  const startGame = () => {
    setIsGameActive(true);
    setUserInput('');
    setTime(60);
    inputRef.current.focus();
  };

  // Logika timer
  useEffect(() => {
    let timer;
    if (isGameActive && time > 0) {
      timer = setTimeout(() => setTime(time - 1), 1000);
    } else if (time === 0) {
      setIsGameActive(false);
    }
    return () => clearTimeout(timer);
  }, [isGameActive, time]);

  // Fungsi untuk render karakter dengan kelas yang tepat
  const renderText = () => {
    return sampleText.split('').map((char, index) => {
      let className = 'char';
      if (index < userInput.length) {
        className += userInput[index] === char ? ' correct' : ' incorrect';
      }
      if (index === userInput.length) {
        className += ' current';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  // Hitung WPM (Words Per Minute)
  const calculateWPM = () => {
    if (!isGameActive && userInput.length > 0) {
      const wordsTyped = userInput.trim().split(/\s+/).length;
      return Math.round(wordsTyped / (60 / time)); // Sederhanakan, diasumsikan 60 detik
    }
    return 0;
  };

  return (
    <div className="typing-game-container">
      <header className="game-header">
        <h1>Typing Speed Test</h1>
      </header>

      <div className="game-info">
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-label">WPM</span>
            <span className="stat-value">{calculateWPM()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Time</span>
            <span className="stat-value">{time}s</span>
          </div>
        </div>
      </div>

      <main className="text-display-area">
        {/* Input yang tidak terlihat */}
        <input
          ref={inputRef}
          className="typing-input"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={!isGameActive}
        />
        {/* Teks yang ditampilkan dengan styling */}
        <div>{renderText()}</div>
      </main>

      <div className="game-controls">
        {!isGameActive ? (
          <button className="btn btn-primary" onClick={startGame}>
            Start Game
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => setIsGameActive(false)}>
            Stop Game
          </button>
        )}
      </div>
    </div>
  );
};

export default TypingGame;
