import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ActiveTimeChart = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  const formattedData = data.map(item => ({
    date: new Date(item[0] * 1000).toLocaleDateString(),
    activeTime: (item[1] / 3600).toFixed(1),
    averageTime: (item[5] / 3600).toFixed(1)
  }));
  return (
    <ResponsiveContainer width="100%" height={300} paddingBottom={20}>
      <ComposedChart
        data={formattedData}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tickLine={false} tick={{ fill: '#8a8a8a', fontSize: 12 }} />
        <YAxis domain={[0, 24]} tickLine={false} tick={{ fill: '#8a8a8a', fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: '#f7f7f7', borderRadius: 5, color: '#1f1f1f' }} />
        <Legend verticalAlign="top" align="right" wrapperStyle={{ lineHeight: '40px' }} />
        {/* Bar for active time */}
        <Bar dataKey="activeTime" name="Active Time (h)" fill="#3f51b5" animationDuration={500} />
        {/* Line for average time */}
        <Line type="monotone" dataKey="averageTime" name="Average Time (h)" stroke="#ff7300" dot={false} strokeWidth={3} animationDuration={500} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ActiveTimeChart;
