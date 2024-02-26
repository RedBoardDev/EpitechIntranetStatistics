import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { COLORS, BOX_SHADOW } from '../styles.js';
import CustomToolTip from './CustomToolTip.js';

const extractModuleInfo = (moduleName) => {
    const regex = /(\[[A-Z]-[A-Z]+-\d+\])\s*(\w+)\s*-\s*(.+)/;
    const matches = moduleName.match(regex);

    if (matches) {
        const code = matches[2];
        const restOfString = matches[3];
        const moduleCompleteName = `[${code}] - ${restOfString}`;

        return `${moduleCompleteName}`;
    }
    return moduleName;
};

const extractStudentNotes = (user_credits = 0, credits = 0, grade = undefined) => {
    const creditsString = `${user_credits ?? 0}/${credits} credits`;

    if (!grade || grade === 'N/A')
        return `${creditsString}`;
    return `${grade.toString()} - ${creditsString}`;
}

const determineTooltip = (data) => {
    if (data === 'N/A')
        return 'Not rated';
    if (!data)
        return "Not registered";
    if (data === 'ECHEC')
        return 'Failed';
    return 'Passed';
}

const ModuleInfo = ({ module }) => {
    const [moduleColor, setModuleColor] = useState('#8d9396');

    // #bf6c1b orange
    // #2d962d green
    // #f25050 red
    // #8d9396 grey

    useEffect(() => {
        switch (module.color) {
            case 'orange':
                setModuleColor('#bf6c1b');
                break;
            case 'green':
                setModuleColor('#2d962d');
                break;
            case 'red':
                setModuleColor('#f25050');
                break;
            default:
                setModuleColor('#8d9396');
                break;
        }
    }, [module]);

    return (
        <Typography key={module.name} sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <CustomToolTip title={determineTooltip(module.student_grade)} placement="left">
                <span style={{ color: moduleColor }}>{extractModuleInfo(module.name)}</span>
            </CustomToolTip>
            <span style={{ whiteSpace: 'nowrap', fontSize: '15px', color: `${!module.color ? '#8d9396' : ''}` }}>{extractStudentNotes(module.student_credits, module.credits, module.student_grade)}</span>
        </Typography>
    );
};

const RoadBlockCard = ({ roadblockData }) => {
    const {
        name: type,
        actual_student_credits,
        credit_needed,
        available_credits,
        modules,
    } = roadblockData;

    return (
        <Box
            sx={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '6px',
                width: '100%',
                padding: '12px',
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
                    {type}
                </Typography>
                <CustomToolTip
                    title={actual_student_credits < credit_needed ?
                        <>
                            Not enough credits<br />
                            You can have {available_credits} credits
                        </>
                        : 'Enough credits'}
                    placement="left"
                >
                    <Typography sx={{
                        fontSize: 'clamp(12px, 0.9vw, 20px)',
                        marginRight: '4px',
                        marginLeft: '4px',
                        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
                        color: actual_student_credits < credit_needed ? '#f25050' : '#2d962d'
                    }}>
                        {actual_student_credits} / {credit_needed}
                    </Typography>
                </CustomToolTip>
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