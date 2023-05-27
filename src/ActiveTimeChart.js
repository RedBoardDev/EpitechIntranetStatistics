import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import Box from '@mui/material/Box';

const ActiveTimeChart = ({ data }) => {
    if (!data) {
        return <div>Loading...</div>;
    }

    const {
        _last7DayActiveTime,
        _myTotalLastWeekHour,
        _averageTotalLastWeekHour,
        _myTotalActualWeekHour,
        _averageTotalActualWeekHour,
        _mytotalYearHour,
        _averageTotalYearHour
    } = data;

    const StyledBoxLog = ({ title, text1, text2 }) => {
        return (
            <Box
                sx={{
                    background: '#181c25',
                    color: '#fff',
                    width: '100%',
                    padding: '10px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    margin: '10px',
                    borderRadius: '10px',
                    border: '1px solid #87ceeb'
                }}
            >
                <h1>{title}</h1>
                <h2>{text1}</h2>
                <h2>{text2}</h2>
            </Box>
        );
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
                style={{
                    display: 'flex',
                    width: '100%'
                }}
            >
                <StyledBoxLog
                    title="Last week"
                    text1={`Me: ${_myTotalLastWeekHour.toFixed(2)}H`}
                    text2={`Average: ${_averageTotalLastWeekHour.toFixed(2)}H`}
                />
                <StyledBoxLog
                    title="This week"
                    text1={`Me: ${_myTotalActualWeekHour.toFixed(2)}H`}
                    text2={`Average: ${_averageTotalActualWeekHour.toFixed(2)}H`}
                />
                <StyledBoxLog
                    title="School year"
                    text1={`Me: ${_mytotalYearHour.toFixed(2)}H`}
                    text2={`Average: ${_averageTotalYearHour.toFixed(2)}H`}
                />
            </div>
            <div className="infoTimeBox2" style={{ display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height={300} paddingBottom={20}>
                    <ComposedChart
                        data={_last7DayActiveTime}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" tickLine={false} tick={{ fill: '#8a8a8a', fontSize: 12 }} />
                        <YAxis domain={[0, 24]} tickLine={false} tick={{ fill: '#8a8a8a', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#f7f7f7', borderRadius: 5, color: '#1f1f1f' }} />
                        <Legend verticalAlign="top" align="right" wrapperStyle={{ lineHeight: '40px' }} />
                        <Bar dataKey="activeTime" name="Active Time (h)" fill="#3f51b5" animationDuration={500} />
                        <Line
                            type="monotone"
                            dataKey="averageTime"
                            name="Average Time (h)"
                            stroke="#ff7300"
                            dot={false}
                            strokeWidth={3}
                            animationDuration={500}
                            connectNulls={true}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ActiveTimeChart;
