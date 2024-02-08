import React from 'react';
import { Box } from '@mui/material';
import { useData } from '../contexts/DataContext';
import SummaryCard from '../components/SummaryCard';
import RowGenerator from '../components/RowGenerator';
import HubCard from '../components/HubCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Hub = () => {
    const { hubData } = useData();
    const itemsPerRow = 2;

    const renderCell = (key, data) => (
        <HubCard key={key} data={data} />
    );

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
                { title: "Currently", text: `${hubData && hubData['xp_completed'] !== undefined ? hubData['xp_completed'] : '-'} XP` },
                { title: "In progress", text: `${hubData && hubData['xp_in_progress'] !== undefined ? hubData['xp_in_progress'] : '-'} XP` },
                { title: "Lost", text: `${hubData && hubData['xp_lost'] !== undefined ? (hubData['xp_lost'] ? hubData['xp_lost'] * (-1) : '-') : '-'} XP` },
            ]} />
            <LoadingSpinner data={hubData} />
            <RowGenerator data={hubData?.activities_per_type || []} itemsPerRow={itemsPerRow} renderCell={renderCell} />
        </Box>
    );
};

export default Hub;
