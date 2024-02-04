import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useData } from '../contexts/DataContext';
import SummaryCard from '../components/SummaryCard';
import RowGenerator from '../components/RowGenerator';
import RoadBlockCard from '../components/RoadBlockCard';
import HubCard from '../components/HubCard';

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
            }}
        >
            <SummaryCard cardsData={[
                { title: "Currently", text: `${hubData['xp_completed']} XP` },
                { title: "In progress", text: `${hubData['xp_in_progress']} XP` },
                { title: "Lost", text: `${hubData['xp_lost'] ? (hubData['xp_lost'] * (-1)) : undefined} XP`},
            ]} />

            <RowGenerator data={hubData.activities_per_type} itemsPerRow={itemsPerRow} renderCell={renderCell} />
        </Box>
    );
};

export default Hub;
