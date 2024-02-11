import React, { useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

const TEPitech = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                overflow: 'auto',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" fontWeight="bold" color="text.secondary" sx={{ color: '#757575' }}>
                SOON...
            </Typography>
        </Box>
    );
};

export default TEPitech;
