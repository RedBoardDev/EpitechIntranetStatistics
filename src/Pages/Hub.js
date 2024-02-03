import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DashboardCard from '../components/DashboardCard';

const Hub = () => {
    const [dashboardCard, setDashboardCard] = useState({});

    useEffect(() => {
        const handleDashboardUpdate = (event) => {
            const { detail } = event;
            setDashboardCard(detail);
        };

        window.addEventListener('dashboard', handleDashboardUpdate);

        return () => {
            window.removeEventListener('dashboard', handleDashboardUpdate);
        };
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                overflow: 'hidden',
            }}
        >
            <DashboardCard data={dashboardCard} />
            <Box
                sx={{
                    display: 'flex',
                    flex: '1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    border: '2px solid #1F364D',
                    borderRadius: '14px',
                    margin: '18px',
                    marginTop: '0px',
                }}
            >
                HUB
            </Box>
        </Box>
    );
};

export default Hub;
