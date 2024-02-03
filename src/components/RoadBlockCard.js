import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

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

const ModuleInfo = ({ module }) => {
    const [moduleColor, setModuleColor] = useState('gray');

    useEffect(() => {
        switch (module.color) {
            case 'orange':
                setModuleColor('#c8cfdb');
                break;
            case 'green':
                setModuleColor('#2d962d');
                break;
            case 'red':
                setModuleColor('#f25050');
                break;
            default:
                setModuleColor('#666c70');
                break;
        }
    }, [module]);

    return (
        <Typography key={module.name} sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: moduleColor }}>{extractModuleInfo(module.name, module.student_grade)}</span>
            <span style={{ whiteSpace: 'nowrap', fontSize: '15px' }}>{module.user_credits ?? 0}/{module.credits} credits</span>
        </Typography>
    );
};

const RoadBlockCard = ({ roadblockData }) => {
    console.log("roadblock detail", roadblockData);

    const {
        type,
        actual_student_credits,
        credit_needed,
        user_credits,
        available_credits,
        modules,
    } = roadblockData;

    return (
        <Box
            sx={{
                flex: '1',
                backgroundColor: '#F0EFF4',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '6px',
                width: '100%',
                border: '2px solid #1F364D',
                padding: '6px',
                height: '100%',
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
                    {type}
                </Typography>
                <Typography sx={{
                    fontSize: 'clamp(12px, 0.9vw, 20px)',
                    marginRight: '4px',
                    marginLeft: '4px',
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
                    color: actual_student_credits < credit_needed ? '#f25050' : '#2d962d'
                }}>
                    {actual_student_credits} / {credit_needed}
                </Typography>
            </Box>
            <Box
                sx={{
                    marginTop: '8px',
                    marginLeft: '4px',
                }}
            >
                {modules.map((module) => (
                    <ModuleInfo key={module.name} module={module} />
                ))}
            </Box>
        </Box>
    );
};

export default RoadBlockCard;