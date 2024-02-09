import React, { useState } from 'react';
import { Box, IconButton, Modal, Slide } from '@mui/material';
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

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flex: '1',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '14px',
                margin: '18px',
                marginTop: '0px',
                height: '100%',
                backgroundColor: COLORS.box2,
                boxShadow: BOX_SHADOW.box2,
            }}
        >
            <LoadingSpinner data={timelineData} />

            {timelineData && timelineData.length > 0 && (
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '2px',
                        left: '2px',
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
                    zIndex: 999999,
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
                            margin: '-18px',
                        }}
                            onClick={closeModal}>
                            <FullscreenExitIcon />
                        </IconButton>
                        <ChartComponent data={timelineData} />
                    </Box>
                </Slide>
            </Modal>
        </Box>
    );
};

export default TimelineBox;