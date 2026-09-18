import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Contact from './components/Contact';
import Services from './components/Services';


function App() {
  return (
    <React.StrictMode>
      <Header/>
      <Home/>
      <About/>
      <Services/>
      <Contact/>
      <Footer/>
    </React.StrictMode>

  );
}

export default App;
