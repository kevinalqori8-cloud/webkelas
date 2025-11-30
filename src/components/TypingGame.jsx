// src/components/TypingGame.js
import React, { useState, useEffect, useRef } from 'react';
import './TypingGame.css'; // Buat file CSS untuk styling

const sampleTexts = [
  "React adalah library JavaScript untuk membangun antarmuka pengguna.",
  "State management adalah cara mengelola data dalam aplikasi React.",
  "Vite adalah build tool modern yang memberikan pengalaman pengembangan cepat.",
];

function TypingGame() {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Pilih teks acak saat komponen dimuat
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  }, []);

  const startGame = () => {
    setIsGameActive(true);
    setStartTime(Date.now());
    setUserInput('');
    setIsGameFinished(false);
    setWpm(0);
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    if (!isGameActive) return;

    const currentInput = e.target.value;
    setUserInput(currentInput);

    // Cek apakah pengguna selesai mengetik
    if (currentInput === text) {
      endGame();
    }
  };

  const endGame = () => {
    setIsGameActive(false);
    setIsGameFinished(true);

    const endTime = Date.now();
    const timeInSeconds = (endTime - startTime) / 1000;
    const wordsTyped = text.trim().split(' ').length;
    const calculatedWPM = Math.round((wordsTyped / timeInSeconds) * 60);
    
    setWpm(calculatedWPM);

    // --- INTEGRASI PENTING DI SINI ---
    // 1. Hitung poin (misal: 10 poin per WPM)
    const pointsEarned = calculatedWPM * 10;

    // 2. Kirim poin ke backend (simulasi)
    console.log(`Mengirim ${pointsEarned} poin ke backend...`);
    // fetch('/api/user/add-points', { method: 'POST', body: JSON.stringify({ points: pointsEarned }) });

    // 3. Kirim pengumuman ke chat via WebSocket
    announceToChat(pointsEarned);
  };
  
  // Fungsi untuk mengirim pengumuman ke server Socket.IO
  const announceToChat = (points) => {
    // Asumsikan Anda memiliki instance socket yang terhubung
    // import { socket } from './socket'; 
    // socket.emit('send_announcement', {
    //   type: 'points_earned',
    //   message: `🎉 Selamat! Anda baru saja mendapatkan ${points} poin dari game Typing Speed Test!`,
    //   points: points
    // });
    console.log(`PENGUMUMAN KE CHAT: 🎉 Selamat! Anda baru saja mendapatkan ${points} poin dari game Typing Speed Test!`);
  };

  return (
    <div className="typing-game-container">
      <h2>Typing Speed Test</h2>
      <div className="text-display">
        <p>{text}</p>
      </div>
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        placeholder="Klik 'Mulai' dan ketik teks di atas..."
        disabled={!isGameActive}
        rows="5"
      />
      <div className="game-controls">
        {!isGameActive && !isGameFinished && <button onClick={startGame}>Mulai Game</button>}
        {isGameFinished && (
          <div className="results">
            <h3>Selesai!</h3>
            <p>Kecepatan Mengetik: <strong>{wpm} WPM</strong></p>
            <p>Poin Didapat: <strong>{wpm * 10}</strong></p>
            <button onClick={startGame}>Main Lagi</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TypingGame;
