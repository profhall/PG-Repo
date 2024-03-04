# PG-Repo
temp code for playing around a copy/paste


import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Root from './path-to-your-root-component';
import { BrowserRouter } from 'react-router-dom';

// Helper function to wrap the component with BrowserRouter because we are using useNavigate hook in the component
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Root component', () => {
  it('renders Admin App Root text', () => {
    renderWithRouter(<Root />);
    expect(screen.getByText('Admin Apps')).toBeInTheDocument();
  });

  it('navigates to /admin and shows the admin heading', () => {
    renderWithRouter(<Root />, { route: '/admin' });
    expect(screen.getByRole('heading', { name: /admin apps/i })).toBeInTheDocument();
  });

  it('navigates to /admin/emailTemplate and renders EmailMessage component', () => {
    renderWithRouter(<Root />, { route: '/admin/emailTemplate' });
    // Here you would replace 'Email template works!' with actual text or element selectors that represent your EmailMessage component
    expect(screen.getByText('Email template works!')).toBeInTheDocument();
  });

  it('navigates to /admin/nuanceTracker and renders NuanceTracker component', () => {
    renderWithRouter(<Root />, { route: '/admin/nuanceTracker' });
    // Replace 'Nuance Tracker works!' with the actual text or elements from your NuanceTracker component
    expect(screen.getByText('Nuance Tracker works!')).toBeInTheDocument();
  });

  it('navigates to /admin/notifications and renders Notifications component', () => {
    renderWithRouter(<Root />, { route: '/admin/notifications' });
    // Replace 'Notifications work!' with the actual text or elements from your Notifications component
    expect(screen.getByText('Notifications work!')).toBeInTheDocument();
  });
});


