import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { COLORS, BOX_SHADOW } from '../styles.js';

const extractModuleInfo = (moduleName, grade = undefined) => {
    const regex = /(\[[A-Z]-[A-Z]+-\d+\])\s*(\w+)\s*-\s*(.+)/;
    const matches = moduleName.match(regex);

    if (matches) {
        const code = matches[2];
        const restOfString = matches[3];

        if (!grade)
            return `${code} - ${restOfString}`;
        if (grade === 'Acquis')
            return `${code} - ${restOfString} - ${grade}`;

        return `${code} - ${restOfString} - grade ${grade}`;
    } else {
        return moduleName;
    }
};

const CardInfo = ({ module }) => {
    const [moduleColor, setModuleColor] = useState('#666c70');

    useEffect(() => {
        switch (module.status) {
            case 'soon':
                setModuleColor('#666c70');
                break;
            case 'present':
                setModuleColor('#2d962d');
                break;
            case 'absent':
                setModuleColor('#f25050');
                break;
            case 'organisateur':
                setModuleColor('#cf940a');
                break;
            default:
                setModuleColor('#666c70');
                break;
        }
    }, [module]);

    return (
        <Typography key={module.title} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: moduleColor }}>{module.title.replace(/\[(.*?)\]/g, '')}</span>
        </Typography>
    );
};

const HubCard = ({ data }) => {
    const {
        name,
        activities,
        alias,
        limitOrg,
        limitPart,
        nbOrg,
        nbPart,
        nbXPTotal,
        xpLostPart,
        xpWinOrg,
        xpWinPart
    } = data;
    if (data === undefined) return null;
    return (
        <Box
            sx={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '6px',
                width: '100%',
                margin: '-6px',
                padding: '6px',
                backgroundColor: COLORS.box2,
                boxShadow: BOX_SHADOW.box2,
            }}
        >
            <Box
                sx={{
                    borderBottom: '1px solid #1F364D',
                    padding: '1px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" sx={{
                    fontWeight: 'bold',
                    fontSize: 'clamp(16px, 1.2vw, 24px)',
                    marginBottom: '2px',
                }}>
                    {name} - {nbXPTotal} XP
                </Typography>
                <Typography sx={{
                    fontSize: 'clamp(12px, 0.9vw, 20px)',
                    marginRight: '4px',
                    marginLeft: '4px',
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
                }}>
                    {nbPart}/{(limitPart > 99 ? '∞' : limitPart) ?? '∞'}
                </Typography>
            </Box>
            <Box
                sx={{
                    marginTop: '8px',
                    marginLeft: '4px',
                }}
            >
                {activities && activities.length > 0 && activities.map((activity) => (
                    <CardInfo key={activity.title} module={activity} />
                ))}
            </Box>
        </Box>
    );
};

export default HubCard;