import React from 'react';
import { Box } from '@mui/material';
import Layout from './Layout';
import { COLORS, BOX_SHADOW, BORDER_RADIUS } from './styles.js';

const App = () => {
    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            window.parent.postMessage({ type: 'outsideClick' }, '*');
        }
    }

    const overlayStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw',
        zIndex: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };

    const appStyle = {
        height: '66vh',
        width: '66vw',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1'
    };

    return (
        <div onClick={handleOverlayClick} style={overlayStyle}>
            <div style={appStyle}>
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
            </div>
        </div>

    );
};

export default App;
