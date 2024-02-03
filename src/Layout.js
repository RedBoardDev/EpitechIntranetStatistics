import React, { useState } from "react";
import { Box, Select, MenuItem } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Hub from "./Pages/Hub";
import IconButton from "./components/IconButton";

import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';

const Layout = () => {
    const [selectedPage, setSelectedPage] = useState("dashboard");

    const handlePageChange = (page) => {
        setSelectedPage(page);
    };

    const renderSelectedPage = () => {
        switch (selectedPage) {
            case "dashboard":
                return <Dashboard />;
            case "hub":
                return <Hub />;
            // case "roadblock":
            //     return <RoadBlock />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    width: '100%',
                    height: '100%',
                }}
            >
                <Sidebar />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flex: '1',
                        borderRadius: 8,
                        height: '100%',
                        border: '2px solid #1F364D',
                    }}
                >
                    {renderSelectedPage()}
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '2%',
                    width: '100%',
                }}
            >
                <IconButton onClick={() => handlePageChange("dashboard")}
                    selected={selectedPage === "dashboard"}
                    icon={<DeveloperBoardOutlinedIcon />}
                    tooltipText="Dashboard"
                />
                <IconButton
                    onClick={() => handlePageChange("hub")}
                    selected={selectedPage === "hub"}
                    icon={<HubOutlinedIcon />}
                    tooltipText="Hub"
                />
                <IconButton
                    onClick={() => handlePageChange("roadblock")}
                    selected={selectedPage === "roadblock"}
                    icon={<WidgetsOutlinedIcon />}
                    tooltipText="Roadblock"
                />
            </Box>
        </>
    );
};

export default Layout;
