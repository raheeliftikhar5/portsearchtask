import { render, screen, cleanup } from '@testing-library/react';
import Navbar from './Navbar';

afterEach(cleanup);

test('renders navbar with logo', () => {
  render(<Navbar />);
  
  const logoEle = screen.getByTestId('logo');
  expect(logoEle).toBeInTheDocument();
});
