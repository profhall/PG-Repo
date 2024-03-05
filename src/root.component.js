import React, { useEffect } from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import createCache from '@emotion/cache';
import { Typography } from '@mui/material';
import './root.component.css'; // Importing a CSS file for this component

// Dummy components for the routes
const EmailMessage = () => <div>Email Message Component</div>;
const NuanceTracker = () => <div>Nuance Tracker Component</div>;
const Notifications = () => <div>Notifications Component</div>;

// const nonceVal = document.querySelector('meta[name="csp-nonce"]').getAttribute('content');

const cache = createCache({
  key: 'spa-app',
  nonce: "nonceVal",
  prepend: true,
});

const theme = {}; // Define your MUI theme here

function Root({testMode}) {
  useEffect(() => {
    console.log('Admin App Root');
  }, []);

  if (testMode) {
    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          {/* Routes without Router for test mode */}
          <Routes>
            <Route exact path="/admin" element={<Typography variant="h5">Admin App</Typography>} />
            <Route exact path="/admin/emailTemplate" element={<EmailMessage />} />
            <Route exact path="/admin/nuanceTracker" element={<NuanceTracker />} />
            <Route exact path="/admin/notifications" element={<Notifications />} />
          </Routes>
        </ThemeProvider>
      </CacheProvider>
    );
  }

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route exact path="/admin" element={<Typography variant="h5">Admin App</Typography>} />
            <Route exact path="/admin/emailTemplate" element={<EmailMessage />} />
            <Route exact path="/admin/nuanceTracker" element={<NuanceTracker />} />
            <Route exact path="/admin/notifications" element={<Notifications />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default Root;
