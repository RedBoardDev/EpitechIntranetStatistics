import React from 'react';
import { Box, Skeleton } from '@mui/material';
import RowGenerator from '../components/RowGenerator';
import { useData } from '../contexts/DataContext';
import RoadBlockCard from '../components/RoadBlockCard';

const Roadblock = () => {
    const { roadblockData } = useData();
    const itemsPerRow = 2;

    const renderCell = (key, data) => (
        <RoadBlockCard key={key} roadblockData={data} />
    );

    const renderSkeletons = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[...Array(4)].map((_, index) => (
                    <Box key={index} sx={{ width: '40%', margin: '18px', marginTop: 5 }}>
                        <Box sx={{ paddingTop: 0.5 }}>
                            <Skeleton animation="pulse" />
                        </Box>
                        <Skeleton animation="pulse" variant="rounded" height={180} />
                    </Box>
                ))}
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
            {!roadblockData ? renderSkeletons() : (
                <RowGenerator data={roadblockData} itemsPerRow={itemsPerRow} renderCell={renderCell} />
            )}
        </Box>
    );
};

export default Roadblock;