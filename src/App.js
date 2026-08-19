import React, { useEffect, useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import EntranceGateAnimation from './EntranceGateAnimation';
import './App.css';

function App() {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Entrance animation ke time body scroll block rahe.
    if (!contentVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [contentVisible]);

  return (
    <div className="App">
      {!contentVisible && (
        <EntranceGateAnimation onComplete={() => setContentVisible(true)} />
      )}

      {contentVisible && (
        <>
          <Header />
          <main>
            <Hero />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
