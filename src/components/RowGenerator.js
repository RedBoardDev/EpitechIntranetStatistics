import React from 'react';
import { Box } from '@mui/material';

const RowGenerator = ({ data = [], itemsPerRow, renderCell }) => {
    let rows = [];
    const numRows = Math.ceil(data.length / itemsPerRow);

    for (let i = 0; i < numRows; i++) {
        const startIndex = i * itemsPerRow;
        const endIndex = startIndex + itemsPerRow;
        const rowData = data.slice(startIndex, endIndex);

        rows.push(
            <Box
                key={i}
                sx={{
                    gap: '20px',
                    display: 'flex',
                    margin: '18px',
                    flexDirection: 'row',
                    height: 'fit-content',
                }}
            >
                {rowData.map((item, index) =>
                    renderCell(index + startIndex, item))}
            </Box>
        );
    }

    return rows;
};

export default RowGenerator;
