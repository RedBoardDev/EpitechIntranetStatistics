import React, { useState } from 'react';
import { Box, IconButton, Modal, Skeleton, Slide } from '@mui/material';
import ChartComponent from "../components/ChartComponent";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import LoadingSpinner from '../components/LoadingSpinner';
import { COLORS, BOX_SHADOW } from '../styles.js';

const TimelineBox = ({ timelineData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderSkeletons = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Box sx={{ width: '16%', height: '90%', margin: '10px', marginRight: 0 }}>
                    <Skeleton
                        animation="pulse"
                        variant="rect"
                        width="100%"
                        height="100%"
                        sx={{ borderRadius: '14px' }}
                    />

                </Box>
                <Box sx={{ height: '90%', width: '75%', margin: '10px' }}>
                    <Skeleton
                        animation="pulse"
                        variant="rect"
                        width="100%"
                        height="100%"
                        sx={{ borderRadius: '14px' }}
                    />
                    <Box sx={{ paddingTop: 0.5, marginRight: 1, marginLeft: 1 }}>
                        <Skeleton animation="pulse" />
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '14px',
                margin: '18px',
                marginTop: '0px',
                height: '100%',
                position: 'relative',
                backgroundColor: COLORS.box2,
                boxShadow: BOX_SHADOW.box2,
            }}
        >

            {/* {renderSkeletons()} */}
            {!timelineData ? renderSkeletons() : (
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '2px',
                        left: '2px',
                        zIndex: 999
                    }}
                    onClick={openModal}
                    title="Full screen"
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
                    zIndex: 999999,
                }}
            >
                <Slide direction="up" in={isModalOpen} mountOnEnter unmountOnExit>
                    <Box sx={{
                        bgcolor: 'white',
                        borderRadius: '14px',
                        padding: 4,
                        width: '90%',
                        height: '90%',
                        backgroundColor: COLORS.box22,
                        boxShadow: BOX_SHADOW.box22,
                    }}>
                        <IconButton
                            style={{
                                position: 'absolute',
                                zIndex: 999,
                                margin: '-18px',
                            }}
                            onClick={closeModal}
                            title="Close"
                        >
                            <FullscreenExitIcon />
                        </IconButton>
                        <ChartComponent data={timelineData} fullscreen />
                    </Box>
                </Slide>
            </Modal>
        </Box>
    );
};

export default TimelineBox;