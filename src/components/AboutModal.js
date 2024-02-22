import React from 'react';
import { Modal, Box, Typography, Link, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useData } from '../contexts/DataContext';

const SettingsModal = ({ isOpen, handleClose }) => {
    const { developperData } = useData();

    return (
        <Modal open={isOpen} onClose={handleClose} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{
                    maxWidth: 400,
                    bgcolor: 'white',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: 3,
                    padding: 2,
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4" sx={{
                            fontWeight: 'semibold',
                            fontSize: 'clamp(16px, 1.2vw, 24px)',
                            marginBottom: '2px',
                        }}>
                            Settings
                        </Typography>
                        <IconButton onClick={handleClose} size="small"><CloseIcon /></IconButton>
                    </Box>
                    <Box sx={{ textAlign: 'center', mb: 3, mt: 3 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>Actual version: {developperData?.currentVersion ?? '-'}</Typography>
                        <Typography variant="body1">Last data file update: {developperData?.dataLastUpdate ?? '-'}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>To report a bug, suggest a feature or report an incorrect data, please consult {' '}
                            <Link href="https://github.com/RedBoardDev/EpitechIntranetStatistics/issues" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', textDecoration: 'underline' }}>issues on GitHub</Link>.
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: 1.4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" sx={{ mb: -0.6 }}>
                            Developed by <Link href="https://github.com/RedBoardDev" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', textDecoration: 'underline', cursor: 'pointer' }}>RedBoardDev</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default SettingsModal;
