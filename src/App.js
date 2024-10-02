import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProductCategories from './components/ProductCategories';
import Header from './components/Header';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Create a PrivateRoute component to protect routes
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state to avoid flicker during authentication check

  // Check localStorage for authentication status on initial load
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false); // Set loading to false after checking authentication status
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#fff',
        paper: darkMode ? '#121212' : '#f5f5f5',
      },
      text: {
        primary: darkMode ? '#fff' : '#000',
      },
    },
  });

  // Render the content only when the loading is complete
  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder while checking authentication
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header toggleDarkMode={toggleDarkMode} />
        <div style={{ margin: 0, padding: 0, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
          <Routes>
            <Route
              path="/"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            {/* Protect /dashboard route */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ProductCategories />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
