import React from 'react';
import { Box } from '@mui/material';
import Layout from './Layout';

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
            <Layout />
        </Box>
    );
};

export default App;
