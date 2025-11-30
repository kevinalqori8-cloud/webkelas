import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';

import Layout from './components/Layout';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import TypingGame from './components/TypingGame';
import PointsShop from './components/PointsShop';

function App() {
  const { user, loading } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = (newPath) => {
    window.history.pushState({}, '', newPath);
    setCurrentPath(newPath);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    if (currentPath === '/register') {
      return <Register />;
    }
    return <Login />;
  }

  let pageToRender;
  switch (currentPath) {
    case '/game':
      pageToRender = <TypingGame />;
      break;
    case '/shop':
      pageToRender = <PointsShop />;
      break;
    default:
      pageToRender = <Home />;
  }

  return (
    <Layout currentPath={currentPath} onNavigate={navigate}>
      {pageToRender}
    </Layout>
  );
}

export default App;
