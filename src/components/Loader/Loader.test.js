import { render, cleanup } from '@testing-library/react';
import Loader from './Loader';

afterEach(cleanup);

test('renders loader', () => {
  const { container } = render(<Loader />);

  const appNavbar = container.querySelector('.loader');
  expect(appNavbar).toBeVisible();
});
