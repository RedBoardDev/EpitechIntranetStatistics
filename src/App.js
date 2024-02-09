import React from 'react';
import { Box } from '@mui/material';
import Layout from './Layout';
import { COLORS, BOX_SHADOW, BORDER_RADIUS } from './styles.js';

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
                borderRadius: BORDER_RADIUS.main,
                boxShadow: BOX_SHADOW.mainBackground,
                backgroundColor: COLORS.mainBackground,
                padding: 2,
                boxSizing: 'border-box',
            }}
        >
            <Layout />
        </Box>
    );
};

export default App;
