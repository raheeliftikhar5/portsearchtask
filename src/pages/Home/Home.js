import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomSelect from 'components/CustomSelect/CustomSelect';
import CustomDateRangePicker from 'components/CustomDateRangePicker/CustomDateRangePicker';
import './Home.scss';
import LineChart from 'components/LineChart/LineChart';

const Home = ({
  portsList,
  marketRates,
  fetchMarketRates,
}) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (origin && destination) {
      fetchMarketRates(origin.value, destination.value);
    }
  }, [origin, destination]);

  useEffect(() => {
    if (marketRates && marketRates.length) {
      const min = new Date(marketRates[0].day);
      const max = new Date(marketRates[marketRates.length - 1].day);

      setMinDate(min);
      setMaxDate(max);
      setDateRange([min, max]);
    }
    setGraphData(marketRates);
  }, [marketRates]);

  const handleDateChange = (selectedDateRange) => {
    setDateRange(selectedDateRange);

    let data = [...marketRates];
    data = data.filter((d) => {
      const dataDay = new Date(d.day);
      return dataDay >= selectedDateRange[0] && dataDay <= selectedDateRange[1];
    });

    setGraphData(data);
  };

  return (
    <div className="home-page">
      <div className="card d-flex justify-content-between filters">
        <div className="d-flex ">
          <div>
            <small className="filters__label">Origin Port</small>
            <CustomSelect
              placeholder="Select Origin"
              options={portsList}
              onChange={setOrigin}
            />
          </div>
          <div>
            <small className="filters__label">Destination Port</small>
            <CustomSelect
              placeholder="Select Destination"
              options={portsList}
              onChange={setDestination}
            />
          </div>
        </div>
        {
          minDate && maxDate && (
            <div>
              <small className="filters__label">Date Range</small>
              <CustomDateRangePicker
                value={dateRange}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
          )
        }
      </div>
      <div className="card graph-section">
        <LineChart marketRates={graphData} />
      </div>
    </div>
  );
};

Home.propTypes = {
  portsList: PropTypes.arrayOf(Array).isRequired,
  marketRates: PropTypes.arrayOf(Array).isRequired,
  fetchMarketRates: PropTypes.func.isRequired,
};

export default Home;
