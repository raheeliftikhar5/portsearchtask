import { render, screen, cleanup } from '@testing-library/react';
import LineChart from './LineChart';

const data = [
  {
    "day": "2021-01-01",
    "mean": 1615,
    "low": 1037,
    "high": 2436
  },
  {
    "day": "2021-01-02",
    "mean": 1615,
    "low": 1037,
    "high": 2436
  },
  {
    "day": "2021-01-03",
    "mean": 1615,
    "low": 1037,
    "high": 2436
  },
  {
    "day": "2021-01-04",
    "mean": 1615,
    "low": 1037,
    "high": 2435
  },
];

afterEach(cleanup);

test('renders line chart', () => {
  const { container } = render(<LineChart marketRates={data} />);

  const graph = container.querySelector('.graph-svg');
  expect(graph).toBeVisible();
});
