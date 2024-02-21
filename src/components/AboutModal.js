import React from 'react';
import { Modal, Box, Typography, Link, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import packageJson from '../../package.json';

const SettingsModal = ({ isOpen, handleClose }) => {
    const currentVersion = packageJson.version;
    const latestVersion = 'Soon...';

    return (
        <Modal open={isOpen} onClose={handleClose} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{
                maxWidth: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: 4,
                padding: 3
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5">
                        Settings
                    </Typography>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ textAlign: 'left', mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Version actuelle : {currentVersion}
                    </Typography>
                    <Typography variant="body1">
                        Dernière version disponible : {latestVersion}
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Pour signaler un bug ou proposer une fonctionnalité, veuillez consulter les{' '}
                        <Link href="https://github.com/RedBoardDev/EpitechIntranetStatistics/issues" target="_blank" rel="noopener noreferrer">
                            issues sur GitHub
                        </Link>.
                    </Typography>
                </Box>
            </Box>
        </Modal>
    );
};

export default SettingsModal;
