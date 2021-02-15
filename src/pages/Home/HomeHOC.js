import { connect } from 'react-redux';
import { fetchPortsList, fetchMarketRates } from 'store/app/appAction';
import Home from './Home';

const mapStateToProps = (state) => {
  const {
    appLoader,
    portsList,
    marketRates,
  } = state.app;

  return {
    appLoader,
    portsList,
    marketRates,
  };
};

const mapActionsToProps = {
  fetchPortsList,
  fetchMarketRates,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
