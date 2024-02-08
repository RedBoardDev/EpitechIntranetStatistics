import React, { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
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

    const renderSkeletons = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[...Array(4)].map((_, index) => (
                    <Box key={index} sx={{ width: '46%', margin: '8px', marginTop: 0 }}>
                        <Box sx={{ paddingTop: 0.5 }}>
                            <Skeleton animation="pulse" />
                        </Box>
                        <Skeleton animation="pulse" variant="rounded" height={100} />
                    </Box>
                ))}
                <Box sx={{ width: '100%', marginBottom: '18px', marginLeft: '3%', marginRight: '3%' }}>
                    <Box sx={{ paddingTop: 0.5 }}>
                        <Skeleton animation="pulse" />
                    </Box>
                    <Skeleton animation="pulse" variant="rounded" height={100} />
                </Box>
            </Box>
        );
    };

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

            {!hubData ? renderSkeletons() : (
                <RowGenerator data={hubData?.activities_per_type || []} itemsPerRow={itemsPerRow} renderCell={renderCell} />
            )}
        </Box>
    );
};

export default Hub;
