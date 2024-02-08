import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Hub from "./Pages/Hub";
import Roadblock from "./Pages/Roadblock";
import IconButton from "./components/IconButton";

// icons
import HiveRoundedIcon from '@mui/icons-material/HiveRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import BatchPredictionRoundedIcon from '@mui/icons-material/BatchPredictionRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';

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
                    icon={<HiveRoundedIcon />}
                    tooltipText="Dashboard"
                />
                <IconButton
                    onClick={() => handlePageChange("roadblock")}
                    selected={selectedPage === "roadblock"}
                    icon={<WidgetsRoundedIcon />}
                    tooltipText="Roadblock"
                />
                <IconButton
                    onClick={() => handlePageChange("hub")}
                    selected={selectedPage === "hub"}
                    icon={<BatchPredictionRoundedIcon />}
                    tooltipText="Hub"
                />
                <IconButton
                    onClick={() => handlePageChange("tepitech")}
                    selected={selectedPage === "tepitech"}
                    icon={<PublicRoundedIcon />}
                    tooltipText="TEPitech"
                />
            </Box>
        </>
    );
};

export default Layout;
