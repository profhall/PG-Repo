import { render, screen } from '@testing-library/react';
import Root from './root.component'; // Update this path to the actual location of your Root component
import { BrowserRouter } from 'react-router-dom';

describe('Root component', () => {
  it('renders the text "Workbench Admin Apps"', () => {
    render(
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );
    // Use the exact text from your component, including case and spacing
    expect(screen.getByText('Workbench Admin Apps')).toBeInTheDocument();
  });

  // ... Other tests
});
