import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import DashboardCard from './DashboardCard';

const Dashboard = () => {
    useEffect(() => {
        const handleDashboardUpdate = (event) => {
            const { detail } = event;
            console.log("dashboard", detail);
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
            <DashboardCard />
            <Box
                sx={{
                    width: '100%',
                    flex: '1',
                    backgroundColor: 'lightgreen',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '14px',
                }}
            >
                Bottom Box
            </Box>
        </Box>
    );
};

export default Dashboard;
