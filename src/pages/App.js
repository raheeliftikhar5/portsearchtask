import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import Loader from 'components/Loader/Loader';
import HomeHOC from './Home/HomeHOC';
import './App.scss';

const App = ({
  appLoader,
  fetchPortsList,
}) => {
  useEffect(() => {
    fetchPortsList();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main className="app__content">
        {
          appLoader
            ? <Loader />
            : <HomeHOC />
        }
      </main>
      <Footer />
    </div>
  );
};

App.defaultProps = {
  appLoader: false,
};

App.propTypes = {
  appLoader: PropTypes.bool,
  fetchPortsList: PropTypes.func.isRequired,
};

export default App;
