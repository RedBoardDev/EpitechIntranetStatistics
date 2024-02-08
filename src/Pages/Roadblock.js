import React from 'react';
import { Box } from '@mui/material';
import RowGenerator from '../components/RowGenerator';
import { useData } from '../contexts/DataContext';
import RoadBlockCard from '../components/RoadBlockCard';
import LoadingSpinner from '../components/LoadingSpinner';

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
                position: 'relative',

            }}
        >
            {console.log(roadblockData)}
            <LoadingSpinner data={roadblockData} />
            <RowGenerator data={roadblockData} itemsPerRow={itemsPerRow} renderCell={renderCell} />
        </Box>
    );
};

export default Roadblock;