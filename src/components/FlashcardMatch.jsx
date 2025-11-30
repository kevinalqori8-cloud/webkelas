// src/components/FlashcardMatch.js

import React, { useState, useEffect } from 'react';
import './FlashcardMatch.css'; // Kita akan buat file CSS ini selanjutnya

// Data kartu bisa diganti dengan materi pelajaran Anda
const initialCardData = [
  { id: 1, value: 'React' },
  { id: 2, value: 'JavaScript' },
  { id: 3, value: 'Component' },
  { id: 4, value: 'State' },
  { id: 5, value: 'Props' },
  { id: 6, value: 'JSX' },
];

function FlashcardMatch() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // Fungsi untuk mengacak array (Fisher-Yates shuffle)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Fungsi untuk menginisialisasi atau me-reset game
  const initializeGame = () => {
    const cardsToCreate = [...initialCardData, ...initialCardData];
    const shuffledCards = shuffleArray(cardsToCreate).map((card, index) => ({
      ...card,
      uniqueId: index, // Tambahkan ID unik untuk setiap kartu
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffledCards);
    setSelectedCards([]);
    setMoves(0);
    setIsChecking(false);
  };

  // Inisialisasi game saat komponen pertama kali dimuat
  useEffect(() => {
    initializeGame();
  }, []);

  // Logika untuk mengecek kartu yang terpilih
  useEffect(() => {
    if (selectedCards.length === 2) {
      setIsChecking(true);
      const [first, second] = selectedCards;

      if (first.value === second.value) {
        // Jika cocok
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.uniqueId === first.uniqueId || card.uniqueId === second.uniqueId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
        }, 600);
      } else {
        // Jika tidak cocok
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.uniqueId === first.uniqueId || card.uniqueId === second.uniqueId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [selectedCards]);

  const handleCardClick = (clickedCard) => {
    // Cegah klik jika kartu sudah cocok, sudah terbuka, atau sedang mengecek
    if (clickedCard.isMatched || clickedCard.isFlipped || isChecking) {
      return;
    }

    // Balik kartu
    setCards(prevCards =>
      prevCards.map(card =>
        card.uniqueId === clickedCard.uniqueId ? { ...card, isFlipped: true } : card
      )
    );

    setSelectedCards(prev => [...prev, clickedCard]);
    setMoves(prev => prev + 1);
  };

  return (
    <div className="game-container">
      <h1>Flashcard Match</h1>
      <p>Cocokkan setiap istilah dengan pasangannya!</p>
      <div className="stats">
        <span>Moves: {moves}</span>
        <button onClick={initializeGame}>Reset Game</button>
      </div>
      <div className="game-board">
        {cards.map(card => (
          <div
            key={card.uniqueId}
            className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlashcardMatch;
