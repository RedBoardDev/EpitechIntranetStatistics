import React from 'react';
import { Box } from '@mui/material';
import { useData } from '../contexts/DataContext';
import SummaryCard from '../components/SummaryCard';
import TimelineBox from './TimelineBox';

const Dashboard = () => {
    const { dashboardData, timelineData } = useData();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                overflow: 'auto',
                position: 'relative',
            }}
        >
            <SummaryCard cardsData={[
                { title: "Credits", text: dashboardData['credits'] },
                { title: "G.P.A", text: dashboardData['GPA'] },
                { title: "Best TEPitech", text: dashboardData['highestTEpitech'] },
            ]} />
            <TimelineBox timelineData={timelineData} />
        </Box>
    );
};

export default Dashboard;
