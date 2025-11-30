
// src/App.js

import React, { useEffect, useState, useRef } from "react";
import Home from "./Pages/Home";
import Carousel from "./Pages/Gallery";
import FullWidthTabs from "./Pages/Tabs";
import Footer from "./Pages/Footer";
import Chat from "./components/ChatAnonim";
import AOS from "aos";
import "aos/dist/aos.css";
import FlashcardMatch from './components/FlashcardMatch';
import Navbar from './components/Navbar';
import './App.css';

// Data section yang sudah diperbarui
const sectionsData = [
  { id: 'beranda', title: 'Beranda', component: <Home /> },
  { id: 'galeri', title: 'Galeri', component: <Carousel /> },
  { id: 'tabs', title: 'Tabs', component: <FullWidthTabs /> },
  { id: 'game', title: 'Game', component: <FlashcardMatch /> },
  { id: 'chat', title: 'Chat', component: <Chat /> },
  { id: 'footer', title: 'Footer', component: <Footer /> }
];

function App() {
  const [activeSection, setActiveSection] = useState('');
  const observerRefs = useRef([]);

  useEffect(() => {
    // Inisialisasi AOS
    AOS.init({
      duration: 1200, // Durasi animasi
    });

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.history.replaceState(null, null, `#${entry.target.id}`);
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Section dianggap aktif jika 50%-nya terlihat
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    observerRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Cleanup function
    return () => {
      observerRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []); // Efek ini hanya dijalankan sekali saat komponen dimuat

  return (
    <div>
      <Navbar sections={sectionsData} activeSection={activeSection} />
      <main>
        {sectionsData.map((section) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => (observerRefs.current[section.id] = el)}
            // Tambahkan data-aos untuk animasi
            data-aos="fade-up" 
            data-aos-duration="1200"
          >
            {/* Render komponen yang sesuai di dalam section */}
            {section.component}
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
