import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default App;
