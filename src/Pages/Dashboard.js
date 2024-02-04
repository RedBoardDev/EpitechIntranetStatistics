import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useData } from '../contexts/DataContext';
import SummaryCard from '../components/SummaryCard';

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
            <SummaryCard cardsData={[
                { title: "Credits", text: dashboardData['credits'] },
                { title: "G.P.A", text: dashboardData['GPA'] },
                { title: "Best TEPitech", text: dashboardData['highestTEpitech'] },
            ]} />
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
