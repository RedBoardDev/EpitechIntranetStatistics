import React from 'react';

import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = ({ data }) => {
    return (<>
        {(!data) && (
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        )}
    </>
    );
};

export default LoadingSpinner;