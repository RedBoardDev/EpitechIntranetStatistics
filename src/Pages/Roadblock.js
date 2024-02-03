import React from 'react';
import { Box, Typography } from '@mui/material';
import RowGenerator from '../components/RowGenerator';
import { useData } from '../contexts/DataContext';
import RoadBlockCard from '../components/RoadBlockCard';

const Roadblock = () => {
    const { roadblockData } = useData();
    const itemsPerRow = 2;

    const renderCell = (key, data) => (
        <RoadBlockCard key={key} roadblockData={data} />
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
            <RowGenerator data={roadblockData} itemsPerRow={itemsPerRow} renderCell={renderCell} />
        </Box>
    );
};

export default Roadblock;