import { render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

jest.mock('./Home/HomeHOC', () => () => <div className="home-page" />);
const fetchPortsList = jest.fn();

test('renders App page', () => {
  const { container } = render(<App fetchPortsList={fetchPortsList} />);
  const appNavbar = container.querySelector('.app__navbar');
  const appContent = container.querySelector('.app__content');
  const appFooter = container.querySelector('.app__footer');

  expect(appNavbar).toBeVisible();
  expect(appContent).toBeVisible();
  expect(appFooter).toBeVisible();
});
