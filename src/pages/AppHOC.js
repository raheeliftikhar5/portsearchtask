import { connect } from 'react-redux';
import { fetchPortsList } from 'store/app/appAction';
import App from './App';

const mapStateToProps = (state) => {
  const { appLoader } = state.app;
  return {
    appLoader,
  };
};

const mapActionsToProps = {
  fetchPortsList,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
