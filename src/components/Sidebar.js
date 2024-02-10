import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useData } from '../contexts/DataContext';
import { COLORS, BOX_SHADOW, BORDER_RADIUS } from '../styles.js';

const Sidebar = () => {
    const { sidebarData } = useData();

    const [city, setCity] = useState('-');
    const [cursus, setCursus] = useState('-');
    const [email, setEmail] = useState('-');
    const [name, setName] = useState('-');
    const [profilPicture, setProfilPicture] = useState('-');
    const [promo, setPromo] = useState('-');
    const [semester, setSemester] = useState('-');

    useEffect(() => {
        setCity(sidebarData.city ?? '-');
        setCursus(sidebarData.cursus ?? '-');
        setEmail(sidebarData.email ?? '-');
        setName(sidebarData.name ?? '-');
        setProfilPicture(sidebarData.profilPicture ?? '-');
        setPromo(sidebarData.promo ?? '-');
        setSemester(sidebarData.semester ?? '-');
    }, [sidebarData]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '22%',
                height: '100%',
                borderRadius: BORDER_RADIUS.box2,
                marginRight: 2,
                boxShadow: BOX_SHADOW.sidebar,
                backgroundColor: COLORS.sidebar,
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
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'rgba(0, 0, 0, 0.12)',
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
