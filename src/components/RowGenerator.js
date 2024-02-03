import React from 'react';
import { Box } from '@mui/material';

const RowGenerator = ({ data, itemsPerRow, renderCell }) => {
    let rows = [];
    for (let i = 0; i < data.length; i += itemsPerRow) {
        rows.push(
            <Box
                key={i}
                sx={{
                    gap: '20px',
                    display: 'flex',
                    height: '100%',
                    margin: '18px',
                    flexDirection: 'row',
                    height: 'fit-content',
                }}
            >
                {data.slice(i, i + itemsPerRow).map((item, index) =>
                    renderCell(index + i, data[index + i]))}
            </Box>
        );
    }
    return rows;
};

export default RowGenerator;
