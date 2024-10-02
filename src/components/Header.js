// Header.js
import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Header = ({ toggleDarkMode }) => {
    const theme = useTheme();

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: theme.palette.background.default, // Use the same background color
                color: theme.palette.text.primary,
                boxShadow: 'none', // Remove shadow
                zIndex: theme.zIndex.drawer + 1, // Ensure the header is above other components
            }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={toggleDarkMode}
                    sx={{ mr: 2 }}
                >
                    <img
                        src="/darkModeLogo.png"
                        alt="OmniPilote Logo"
                        style={{ width: '40px', height: 'auto' }} // Adjust size as needed
                    />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
