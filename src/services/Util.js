import API from './API';

class Util extends API {
  fetchPorts() {
    return super.get('ports');
  }

  fetchMarketRates(origin, destination) {
    return super.get('rates', {
      params: {
        origin,
        destination,
      },
    });
  }
}

export default Util;
