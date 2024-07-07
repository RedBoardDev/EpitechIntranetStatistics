import React from 'react';
import Chart from 'react-apexcharts';
import { Box, Skeleton, Typography } from '@mui/material';
import { useData } from '../contexts/DataContext';
import './TEPitech.css';
import { COLORS } from '../styles';

const renderSkeletons = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%', height: '100%' }}>
            <Box sx={{ height: '100%', width: '100%', margin: '10px' }}>
                <Skeleton
                    animation="pulse"
                    variant="rect"
                    width="100%"
                    height="100%"
                    sx={{ borderRadius: '14px' }}
                />
            </Box>
        </Box>
    );
};

const ShowChart = ({ tepitechs }) => {

    if (!tepitechs) return renderSkeletons();
    const chartData = tepitechs.map((tepitech) => ({
        x: new Date(tepitech.date),
        y: tepitech.final_note,
    }));

    const chartOptions = {
        chart: {
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            },
        },
        legend: {
            show: false
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: chartData.map((data) => data.x),
            labels: {
                format: 'dd/MM/yyyy',
            }
        },
        yaxis: {
            title: {
                text: 'Notes',
            },
            min: 0,
            max: 980,
        },
        tooltip: {
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                const data = tepitechs[dataPointIndex];
                const note = data?.final_note || '-';
                const sections = data?.sections ? Object.entries(data.sections)
                    .map(([sectionName, { score, total }]) => `<div class="apexcharts-tooltip-section">${sectionName}: ${score}/${total}</div>`)
                    .join('') : '';

                return `
                <div class="apexcharts-tooltip-container">
                  <div class="apexcharts-tooltip-title">${note}/980 points</div>
                  <div class="apexcharts-tooltip-content">
                    ${sections}
                  </div>
                </div>
              `;
            },
        },
    };

    return (
        <Box sx={{ height: 'calc(100% - 60px)', width: '100%' }}> {/* 60px est la hauteur du titre */}
            <Chart options={chartOptions} series={[{ name: 'TEPitech', data: chartData.map((data) => data.y) }]} type="line" height='100%' />
        </Box>
    );
};

const TEPitech = () => {
    const { tepitechs } = useData();

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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: '14px',
                    margin: '18px',
                    height: '100%',
                    position: 'relative',
                    backgroundColor: COLORS.box2,
                }}
            >
                <Box sx={{ width: '100%', height: '100%', paddingTop: '10px' }}>
                    <Typography variant="h4" sx={{
                        fontWeight: 'bold',
                        fontSize: 'clamp(16px, 1.2vw, 24px)',
                        marginBottom: '2px',
                        textAlign: 'center',
                    }}>
                        TEPitech - Notes
                    </Typography>
                    {tepitechs && tepitechs.length === 0 ? renderSkeletons() : ShowChart({ tepitechs })}
                </Box>
            </Box>
        </Box>
    );
};

export default TEPitech;
