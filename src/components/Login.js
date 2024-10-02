import React from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('isAuthenticated', 'true'); // Store authentication status
            setIsAuthenticated(true); // Update the state
            navigate('/dashboard');
        } else {
            alert('Invalid credentials!');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: theme.palette.background.default,
                    borderRadius: 1,
                    p: 4,
                    boxShadow: 1,
                }}
            >
                <img
                    src="/cropped-OmniPilote.png"
                    alt="OmniPilote Logo"
                    style={{ cursor: 'pointer', marginBottom: '20px', width: '190px', height: 'auto' }}
                    onClick={() => window.open('https://omnipilote.com/', '_blank')}
                />
                <Typography variant="body2" textAlign="center" marginBottom={2}>
                    Solution globale pour la gestion des locations et du service après-vente
                </Typography>
                <Typography component="h1" variant="h5" textAlign="center">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
