import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Reconnaissance de lichens/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders the button', () => {
  render(<App />);
  const button = screen.getByText(/Charger une image/);
  expect(button).toBeInTheDocument();
  expect(button).toBeVisible();
});
