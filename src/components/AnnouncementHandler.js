import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Typography } from '@mui/material';

const Announcement = ({ id, titles, messages }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [showAnnouncement, setShowAnnouncement] = useState(false);
    const [showAgain, setShowAgain] = useState(false);

    useEffect(() => {
        const seenAnnouncement = localStorage.getItem(id);
        if (!seenAnnouncement) {
            setShowAnnouncement(true);
        }
    }, [currentPage, titles, id]);

    const handleClose = () => {
        if (currentPage < titles.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setShowAnnouncement(false);
            if (showAgain) {
                localStorage.setItem(id, 'seen');
            }
        }
    };

    if (!showAnnouncement) return null;

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 999,
                }}
                onClick={handleClose}
            />
            <Box
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
                    maxWidth: '900px',
                    zIndex: 999,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            marginBottom: '20px',
                            backgroundColor: '#FFBFAE',
                            width: '100%',
                            paddingTop: '14px',
                            paddingBottom: '14px',
                        }}
                    >
                        <img src="/assets/announce.png" alt="" style={{ width: '22%', borderRadius: '20px 20px 0 0' }} />
                    </Box>
                    <Box sx={{ textAlign: 'center', padding: '20px' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>{titles[currentPage]}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '20px' }}>{messages[currentPage]}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', paddingTop: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {currentPage >= titles.length - 1 && (
                            <>
                                <Checkbox
                                    checked={showAgain}
                                    onChange={(e) => setShowAgain(e.target.checked)}
                                />
                                <Typography>Ne plus afficher</Typography>
                            </>
                        )}
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleClose}>{currentPage < titles.length - 1 ? 'Suivant' : 'Fermer'}</Button>
                </Box>
            </Box>
        </>
    );
};

export default Announcement;
