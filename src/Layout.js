import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Hub from "./Pages/Hub";
import Roadblock from "./Pages/Roadblock";
import IconButton from "./components/IconButton";
import { COLORS, BOX_SHADOW, BORDER_RADIUS } from './styles.js';

// icons
import HiveRoundedIcon from '@mui/icons-material/HiveRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import BatchPredictionRoundedIcon from '@mui/icons-material/BatchPredictionRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import TEPitech from "./Pages/TEPitech.js";
import AboutModal from "./components/AboutModal.js";

const Layout = () => {
    const [selectedPage, setSelectedPage] = useState("dashboard");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePageChange = (page) => {
        setSelectedPage(page);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderSelectedPage = () => {
        switch (selectedPage) {
            case "dashboard":
                return <Dashboard />;
            case "hub":
                return <Hub />;
            case "roadblock":
                return <Roadblock />;
            case "tepitech":
            default:
                return <TEPitech />;
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
                        borderRadius: BORDER_RADIUS.box2,
                        overflowY: 'auto',
                        backgroundColor: COLORS.backgroundBox,
                        boxShadow: BOX_SHADOW.backgroundBox,
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
            <img
                src="/icons/logo_128x128.png"
                alt="About"
                title="About"
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '20px',
                    width: '36px',
                    height: 'auto',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s',
                }}
                onClick={openModal}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
            />
            <AboutModal isOpen={isModalOpen} handleClose={closeModal} />
        </>
    );
};

export default Layout;
