import { render, screen } from '@testing-library/react';
import { AuthProvider } from './context/AuthContext';
import App from './App';

test('renders app', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const linkElements = screen.getAllByText(/BAMBARDDARA/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
