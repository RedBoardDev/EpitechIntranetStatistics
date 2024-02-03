import React from 'react';
import { Box, Typography } from '@mui/material';

const CustomCard = ({ title = '-', text='-' }) => {
    return (
        <Box
            sx={{
                flex: '1',
                backgroundColor: '#F0EFF4',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                border: '2px solid #1F364D',
                borderRadius: '14px',
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '4px' }}>
                {text}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '16px', color: '#1F364D', opacity: 0.7 }}>
                {title}
            </Typography>
        </Box>
    );
};


const DashboardCard = ({ data }) => {
    return (
        <Box
            sx={{
                height: '100px',
                display: 'flex',
                flexDirection: 'row',
                gap: '35px',
                overflow: 'hidden',
                padding: '18px',
            }}
        >
            <CustomCard title="Credits" text={data['credits']} />
            <CustomCard title="G.P.A" text={data['GPA']} />
            <CustomCard title="Best TEPitech" text={data['highestTEpitech']} />
        </Box>
    );
};

export default DashboardCard;
