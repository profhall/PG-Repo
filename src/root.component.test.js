import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter is used for testing instead of BrowserRouter
import Root from './root.component';

describe('Root Component', () => {
  test('renders Admin App heading on the /admin route', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Root testMode={true} />
      </MemoryRouter>
    );
    expect(screen.getByText('Admin App')).toBeInTheDocument();
  });

  // test('renders EmailMessage component on the /admin/emailTemplate route', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/admin/emailTemplate']}>
  //       <Root />
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByText('Email Message Component')).toBeInTheDocument();
  // });

  // test('renders NuanceTracker component on the /admin/nuanceTracker route', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/admin/nuanceTracker']}>
  //       <Root />
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByText('Nuance Tracker Component')).toBeInTheDocument();
  // });

  // test('renders Notifications component on the /admin/notifications route', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/admin/notifications']}>
  //       <Root />
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByText('Notifications Component')).toBeInTheDocument();
  // });

});
