import React, { createContext, useContext, useState, useEffect } from 'react';
import { addListener, removeListener } from '../utils/listeners';

const DataContext = createContext();

function transformDataToSeries(data) {
    const courseNames = Object.keys(data);

    let series = [];

    courseNames.forEach(courseName => {
        let courseData = data[courseName];

        courseData.forEach(project => {
            let projectIndex = series.findIndex(serie => serie.name === project.title);

            if (projectIndex === -1) {
                series.push({
                    name: project.title,
                    data: [{ x: courseName, y: [new Date(project.begin).getTime(), new Date(project.end).getTime()] }]
                });
            } else {
                series[projectIndex].data.push({ x: courseName, y: [new Date(project.begin).getTime(), new Date(project.end).getTime()] });
            }
        });
    });
    return series;
}

export const DataProvider = ({ children }) => {
    const [dashboardData, setDashboardData] = useState({});
    const [sidebarData, setSidebarData] = useState({});
    const [roadblockData, setRoadblockData] = useState(undefined);
    const [hubData, setHubData] = useState(null);
    const [timelineData, setTimelineData] = useState(undefined);

    useEffect(() => {
        const handleDashboardUpdate = (event) => {
            const { detail } = event;
            setDashboardData(detail);
        };

        const handleSidebarUpdate = (event) => {
            const { detail } = event;
            setSidebarData(detail);
        };

        const handleRoadblockUpdate = (event) => {
            const { detail } = event;
            setRoadblockData(detail);
        }

        const handleHubUpdate = (event) => {
            const { detail } = event;
            setHubData(detail);
        }

        const handleTimelineUpdate = (event) => {
            const { detail } = event;
            setTimelineData(transformDataToSeries(detail));
        }

        addListener('sidebar', handleSidebarUpdate);
        addListener('dashboard', handleDashboardUpdate);
        addListener('roadblock', handleRoadblockUpdate);
        addListener('hub', handleHubUpdate);
        addListener('timeline', handleTimelineUpdate);

        return () => {
            removeListener('sidebar', handleSidebarUpdate);
            removeListener('dashboard', handleDashboardUpdate);
            removeListener('roadblock', handleRoadblockUpdate);
            removeListener('hub', handleHubUpdate);
            removeListener('timeline', handleTimelineUpdate);
        };
    }, []);

    return (
        <DataContext.Provider value={{ dashboardData, sidebarData, roadblockData, hubData, timelineData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
