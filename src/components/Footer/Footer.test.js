import { render, screen, cleanup } from '@testing-library/react';
import Footer from './Footer';

afterEach(cleanup);

test('renders footer with copyright text', () => {
  render(<Footer />);

  const copyrightText = screen.getByText(/Copyright © 2021/i);
  expect(copyrightText).toBeInTheDocument();
});
