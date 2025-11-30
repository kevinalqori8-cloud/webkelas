import React, { useEffect, useState, useRef } from "react"
import Home from "./Pages/Home"
import Carousel from "./Pages/Gallery"
import FullWidthTabs from "./Pages/Tabs"
import Footer from "./Pages/Footer"
import Chat from "./components/ChatAnonim"
import AOS from "aos"
import "aos/dist/aos.css"
import FlashcardMatch from './components/FlashcardMatch'
import Navbar from './components/Navbar'
import './App.css'

const sectionsData = [
  { id: 'slide-satu', title: 'Slide Satu' },
  { id: 'slide-dua', title: 'Slide Dua' },
  { id: 'slide-tiga', title: 'Slide Tiga' },
];

function App() {
	const [activeSection, setActiveSection] = useState('');
  const observerRefs = useRef([]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Update URL hash
          window.history.replaceState(null, null, `#${entry.target.id}`);
          // Update state untuk menandai section aktif
          setActiveSection(entry.target.id);
        }
      });
    };
	setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null, // Menggunakan viewport sebagai root
      rootMargin: '0px',
      threshold: 0.5, // Section dianggap aktif jika 50%-nya terlihat
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Mulai mengamati setiap section
    observerRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });
return () => {
      observerRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);
	return (
		<div>
			<Navbar sections={sectionsData} activeSection={activeSection} />
      <main>
        {sectionsData.map((section) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => (observerRefs.current[section.id] = el)}
          >
            <h2>{section.title}</h2>
            <p>Ini adalah konten untuk {section.title}. Gulir ke bawah untuk melihat section berikutnya.</p>
          </section>
        ))}
      </main>
    </div>
  );
		<>
			<Home />

			<Carousel />
			<FullWidthTabs />

			<div id="Mesh1"></div>


			<div
				className="lg:mx-[12%] lg:mt-[-5rem] lg:mb-20 hidden lg:block"
				id="ChatAnonim_lg"
				data-aos="fade-up"
				data-aos-duration="1200">
				<Chat />
			</div>
				<div className="App">
				<main>
				<FlashcardMatch />
				</main>
			</div>

			<Footer />
		</>
	)
}

export default App
