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
import Roadblock from "./Pages/Roadblock";

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
            case "roadblock":
                return <Roadblock />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'top',
                    alignItems: 'top',
                    width: '100%',
                    height: '94%',
                }}
            >
                <Sidebar />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1',
                        borderRadius: 8,
                        border: '2px solid #1F364D',
                        overflowY: 'auto'
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
                    height: '30px',
                    paddingTop: '15px',
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
