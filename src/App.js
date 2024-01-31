import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const App = () => {
    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                bgcolor: '#F0EFF4',
                color: '#1F364D',
                borderRadius: 8,
                border: '4px solid #1F364D',
                boxShadow: '0px 0px 10px 0px #1F364D',
                padding: 2,
                boxSizing: 'border-box',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    width: '100%',
                    height: '100%',
                }}
            >
                <Sidebar />
                <Dashboard />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '2%',
                    width: '100%',
                }}
            >
                Navigationbar
            </Box>
        </Box>
    );
};

export default App;
