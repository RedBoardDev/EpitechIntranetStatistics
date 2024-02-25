import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Typography } from '@mui/material';

function writeCookie(key, value, days) {
    var date = new Date();
    days = days || 365;
    date.setTime(+ date + (days * 86400000));
    window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
    return value;
};

function getCookie(name) {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

const Announcement = ({ id, titles, messages, endDate }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [showAnnouncement, setShowAnnouncement] = useState(false);
    const [showAgain, setShowAgain] = useState(false);

    useEffect(() => {
        const seenAnnouncement = getCookie(id);
        const now = new Date();
        const endDateTime = new Date(endDate);

        if (!seenAnnouncement && now < endDateTime) {
            setShowAnnouncement(true);
        }
    }, [currentPage, endDate, titles, id]);

    const handleClose = () => {
        if (currentPage < titles.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setShowAnnouncement(false);
            if (showAgain) {
                const now = new Date();
                const endDateTime = new Date(endDate);
                const diffTime = Math.abs(endDateTime - now);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                writeCookie(id, 'true', diffDays);
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
