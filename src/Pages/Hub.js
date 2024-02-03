import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useData } from '../contexts/DataContext';

const Hub = () => {
    const {  } = useData();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            Hub
        </Box>
    );
};

export default Hub;
