import React from 'react';
import './App.scss';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';

const App = () => (
  <div className="app">
    <Navbar />
    <main className="app__content">
      <p>App Content</p>
    </main>
    <Footer />
  </div>
);

export default App;
