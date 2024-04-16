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
    const [creditsRequirement, setCreditsRequirement] = useState(undefined);
    const [developperData, setDevelopperData] = useState({});
    const [tepitechs, setTepitechs] = useState(undefined);

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

        const handleCreditsRequirementUpdate = (event) => {
            const { detail } = event;
            setCreditsRequirement(detail);
        }

        const handleDevelopperUpdate = (event) => {
            const { detail } = event;
            setDevelopperData(detail);
        }

        const handleTepitechsUpdate = (event) => {
            const { detail } = event;
            setTepitechs(detail);
        }

        addListener('sidebar', handleSidebarUpdate);
        addListener('dashboard', handleDashboardUpdate);
        addListener('roadblocks', handleRoadblockUpdate);
        addListener('hub', handleHubUpdate);
        addListener('timeline', handleTimelineUpdate);
        addListener('credits_requirement', handleCreditsRequirementUpdate);
        addListener('developper', handleDevelopperUpdate);
        addListener('tepitechs', handleTepitechsUpdate);

        return () => {
            removeListener('sidebar', handleSidebarUpdate);
            removeListener('dashboard', handleDashboardUpdate);
            removeListener('roadblocks', handleRoadblockUpdate);
            removeListener('hub', handleHubUpdate);
            removeListener('timeline', handleTimelineUpdate);
            removeListener('credits_requirement', handleCreditsRequirementUpdate);
            removeListener('developper', handleDevelopperUpdate);
            removeListener('tepitechs', handleTepitechsUpdate);
        };
    }, []);

    return (
        <DataContext.Provider value={{
            dashboardData,
            sidebarData,
            roadblockData,
            hubData,
            timelineData,
            creditsRequirement,
            developperData,
            tepitechs
        }}>
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
