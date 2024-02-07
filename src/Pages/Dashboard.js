import React, { useState } from 'react';
import { Box, CircularProgress, IconButton, Modal, Slide } from '@mui/material';
import { useData } from '../contexts/DataContext';
import SummaryCard from '../components/SummaryCard';
import ChartComponent from "../components/ChartComponent";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const Dashboard = () => {
    const { dashboardData, timelineData } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                overflow: 'auto',
                position: 'relative',
            }}
        >
            <SummaryCard cardsData={[
                { title: "Credits", text: dashboardData['credits'] },
                { title: "G.P.A", text: dashboardData['GPA'] },
                { title: "Best TEPitech", text: dashboardData['highestTEpitech'] },
            ]} />
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flex: '1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    border: '2px solid #1F364D',
                    borderRadius: '14px',
                    margin: '18px',
                    marginTop: '0px',
                    height: '100%',
                }}
            >
                {(!timelineData) && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {timelineData && timelineData.length > 0 && (
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            zIndex: 999
                        }}
                        onClick={openModal}
                    >
                        <FullscreenIcon />
                    </IconButton>
                )}
                {timelineData && <ChartComponent data={timelineData} />}
                <Modal
                    open={isModalOpen}
                    onClose={closeModal}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 99999,
                    }}
                >
                    <Slide direction="up" in={isModalOpen} mountOnEnter unmountOnExit>
                        <Box sx={{
                            bgcolor: 'white',
                            borderRadius: '14px',
                            boxShadow: 24,
                            padding: 4,
                            width: '90%',
                            height: '90%',
                        }}>
                            <IconButton style={{
                                position: 'absolute',
                                zIndex: 999,
                            }} onClick={closeModal}>
                                <FullscreenExitIcon />
                            </IconButton>
                            <ChartComponent data={timelineData} />
                        </Box>
                    </Slide>
                </Modal>
            </Box>
        </Box>
    );
};

export default Dashboard;
