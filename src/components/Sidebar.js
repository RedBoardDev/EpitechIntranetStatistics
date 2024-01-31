import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const Sidebar = () => {
    const [city, setCity] = useState('-');
    const [cursus, setCursus] = useState('-');
    const [email, setEmail] = useState('-');
    const [name, setName] = useState('-');
    const [profilPicture, setProfilPicture] = useState('-');
    const [promo, setPromo] = useState('-');
    const [semester, setSemester] = useState('-');

    useEffect(() => {
        const handleSidebarUpdate = (event) => {
            const { detail } = event;
            setCity(detail.city ?? '-');
            setCursus(detail.cursus ?? '-');
            setEmail(detail.email ?? '-');
            setName(detail.name ?? '-');
            setProfilPicture(detail.profilPicture ?? '-');
            setPromo(detail.promo ?? '-');
            setSemester(detail.semester ?? '-');
        };

        window.addEventListener('sidebar', handleSidebarUpdate);

        return () => {
            window.removeEventListener('sidebar', handleSidebarUpdate);
        };
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '22%',
                height: '100%',
                borderRadius: 8,
                border: '2px solid #1F364D',
                marginRight: 2,
            }}
        >
            <Box
                sx={{
                    paddingTop: '30px',
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={profilPicture}
                    alt="Avatar"
                    style={{
                        width: '50%',
                        height: 'auto',
                        borderRadius: '20px',
                        border: '2px solid #1F364D',
                    }}
                    onError={(e) => {
                        e.target.src = 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_960_720.png';
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    width: '94%',
                    color: 'black',
                    flex: '1',
                    paddingLeft: '10%',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> {name} </Typography>
                <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> {email} </Typography>
                <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> {city} </Typography>
                <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> {cursus} </Typography>
                <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> semester {semester} </Typography>
                <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> {promo} </Typography>
            </Box>
        </Box>
    );
};

export default Sidebar;
