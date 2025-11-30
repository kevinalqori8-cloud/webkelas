// Contoh komponen PointsShopPage.jsx
import React from 'react';
import './PointsShop.css'; // Sesuaikan path

const PointsShopPage = () => {
  const [userPoints, setUserPoints] = React.useState(1500);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [notification, setNotification] = React.useState(null);

  const products = [
    { id: 1, name: 'Avatar Keren', description: 'Tampilan avatar baru yang menarik.', price: 500 },
    { id: 2, name: 'Lencana Prestasi', description: 'Lencana eksklusif untuk profil Anda.', price: 1000 },
    // ... produk lainnya
  ];

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    // Logika pembelian di sini
    setIsModalOpen(false);
    showNotification('success', 'Pembelian berhasil!');
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000); // Sembunyikan notifikasi setelah 3 detik
  };

  return (
    <div className="points-shop-container">
      <header className="shop-header">
        <h1>Points Shop</h1>
        <div className="user-points">
          Poin Anda: <span>{userPoints}</span>
        </div>
      </header>

      <main className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-image-container">
              {/* Ganti dengan <img src={...} alt={...} /> */}
              <div className="product-image" style={{ background: '#ddd' }}>Image</div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">{product.price} Poin</span>
                <button className="btn btn-primary" onClick={handleBuyClick}>
                  Beli
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Modal Konfirmasi */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Konfirmasi Pembelian</h2>
            </div>
            <div className="modal-body">
              <p>Apakah Anda yakin ingin membeli item ini?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                Batal
              </button>
              <button className="btn btn-primary" onClick={handleConfirmPurchase}>
                Ya, Beli
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifikasi */}
      {notification && (
        <div className="notification-container">
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsShopPage;
