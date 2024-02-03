import React, { createContext, useContext, useState, useEffect } from 'react';
import { addListener, removeListener } from '../utils/listeners';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dashboardData, setDashboardData] = useState({});
    const [sidebarData, setSidebarData] = useState({});
    const [roadblockData, setRoadblockData] = useState({});

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

        addListener('sidebar', handleSidebarUpdate);
        addListener('dashboard', handleDashboardUpdate);
        addListener('roadblock', handleRoadblockUpdate);

        return () => {
            removeListener('sidebar', handleSidebarUpdate);
            removeListener('dashboard', handleDashboardUpdate);
            removeListener('roadblock', handleRoadblockUpdate);
        };
    }, []);

    return (
        <DataContext.Provider value={{ dashboardData, sidebarData, roadblockData     }}>
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
