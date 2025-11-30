// src/components/PointsShop.js
import React, { useState } from 'react';
import './PointsShop.css';

const shopItems = [
  { id: 1, name: 'Avatar Naga', cost: 500, icon: '🐉' },
  { id: 2, name: 'Gelar "Master Kuis"', cost: 1200, icon: '🏆' },
  { id: 3, name: 'Bingkai Profil Emas', cost: 800, icon: '⭐' },
  { id: 4, name: 'Power-up: Petunjuk Kuis', cost: 150, icon: '💡' },
];

function PointsShop() {
  // Anggap userPoints diambil dari context atau API
  const [userPoints, setUserPoints] = useState(2500); 

  const handleBuyItem = (item) => {
    if (userPoints >= item.cost) {
      // Kirim permintaan pembelian ke backend
      console.log(`Membeli ${item.name}...`);
      // fetch('/api/shop/buy', { method: 'POST', body: JSON.stringify({ itemId: item.id }) });
      
      // Update poin di UI (sementara)
      setUserPoints(prevPoints => prevPoints - item.cost);
      alert(`Berhasil membeli ${item.name}!`);
    } else {
      alert('Poin Anda tidak cukup!');
    }
  };

  return (
    <div className="shop-container">
      <h2>Toko Poin</h2>
      <p>Poin Anda: <strong>{userPoints}</strong></p>
      <div className="items-grid">
        {shopItems.map(item => (
          <div key={item.id} className="shop-item">
            <div className="item-icon">{item.icon}</div>
            <h3>{item.name}</h3>
            <p className="item-cost">{item.cost} Poin</p>
            <button onClick={() => handleBuyItem(item)} disabled={userPoints < item.cost}>
              Beli
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PointsShop;
