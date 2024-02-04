import React, { createContext, useContext, useState, useEffect } from 'react';
import { addListener, removeListener } from '../utils/listeners';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dashboardData, setDashboardData] = useState({});
    const [sidebarData, setSidebarData] = useState({});
    const [roadblockData, setRoadblockData] = useState({});
    const [hubData, setHubData] = useState({});

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

        addListener('sidebar', handleSidebarUpdate);
        addListener('dashboard', handleDashboardUpdate);
        addListener('roadblock', handleRoadblockUpdate);
        addListener('hub', handleHubUpdate);

        return () => {
            removeListener('sidebar', handleSidebarUpdate);
            removeListener('dashboard', handleDashboardUpdate);
            removeListener('roadblock', handleRoadblockUpdate);
            removeListener('hub', handleHubUpdate);
        };
    }, []);

    return (
        <DataContext.Provider value={{ dashboardData, sidebarData, roadblockData, hubData}}>
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
