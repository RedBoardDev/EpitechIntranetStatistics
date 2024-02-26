import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { COLORS, BOX_SHADOW } from '../styles.js';

const CustomCard = ({ title = '-', text = '-', tooltipTitle = null }) => {
    return (
        <Tooltip title={tooltipTitle} placement="bottom" slotProps={{
            popper: {
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, -10],
                        },
                    },
                ],
            },
        }}>
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    backgroundColor: COLORS.box2,
                    borderRadius: '14px',
                    boxShadow: BOX_SHADOW.box2,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '4px' }}>
                    {text}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '16px', color: '#1F364D', opacity: 0.7 }}>
                    {title}
                </Typography>
            </Box>
        </Tooltip>
    );
};

const SummaryCard = ({ cardsData, tooltipTitle = null }) => {
    if (!cardsData) return null;

    return (
        <Box
            sx={{
                height: '100px',
                display: 'flex',
                flexDirection: 'row',
                gap: '35px',
                overflow: 'hidden',
                padding: '18px',
            }}
        >
            {cardsData.map((card, index) => (
                <CustomCard key={index} title={card.title} text={card.text} tooltipTitle={card.tooltipTitle} />
            ))}
        </Box>
    );
};

export default SummaryCard;
