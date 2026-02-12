import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app heading', () => {
  render(<App />);
  const text = screen.getByText(/task management system/i);
  expect(text).toBeInTheDocument();
});
