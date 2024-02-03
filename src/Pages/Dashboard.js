import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DashboardCard from '../components/DashboardCard';
import { useData } from '../contexts/DataContext';

const Dashboard = () => {
    const { dashboardData } = useData();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                overflow: 'auto',
            }}
        >
            <DashboardCard data={dashboardData} />
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
                Bottom Box
            </Box>
        </Box>
    );
};

export default Dashboard;
