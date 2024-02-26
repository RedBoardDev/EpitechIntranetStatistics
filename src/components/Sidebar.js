import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useData } from '../contexts/DataContext';
import { COLORS, BOX_SHADOW, BORDER_RADIUS } from '../styles.js';

const SidebarRender = ({ city, cursus, email, name, profilPicture, promo, semester, creditPhrase }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '22%',
                minWidth: '280px',
                maxWidth: '300px',
                height: '100%',
                borderRadius: BORDER_RADIUS.box2,
                marginRight: 2,
                // boxShadow: BOX_SHADOW.sidebar,
                backgroundColor: COLORS.sidebar,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%',
                    paddingTop: '30px',
                    paddingBottom: '30px',
                }}
            >
                <Box sx={{ textAlign: 'center', width: '100%' }}>
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
                <Box sx={{ textAlign: 'left', width: '88%' }}>
                    <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> {name} </Typography>
                    <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> {email} </Typography>
                    <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> {city} </Typography>
                    <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> {cursus} </Typography>
                    <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> semester {semester} </Typography>
                    <Typography variant="h6" sx={{ fontSize: '16px', color: '#030f1a', opacity: 0.8 }}> {promo} </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', width: '100%' }}>
                    <Typography variant="body1" sx={{ color: 'black', opacity: 0.8 }}>
                        {creditPhrase}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}



const Sidebar = () => {
    const { sidebarData, creditsRequirement } = useData();

    const [city, setCity] = useState('-');
    const [cursus, setCursus] = useState('-');
    const [email, setEmail] = useState('-');
    const [name, setName] = useState('-');
    const [profilPicture, setProfilPicture] = useState('-');
    const [promo, setPromo] = useState('-');
    const [semester, setSemester] = useState('-');
    const [creditPhrase, setCreditPhrase] = useState('Credit information is currently unavailable.');
    const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 1540);
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setShowSidebar(window.innerWidth >= 1540);
            setSidebarOpen(window.innerWidth >= 1540);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setCity(sidebarData.city ?? '-');
        setCursus(sidebarData.cursus ?? '-');
        setEmail(sidebarData.email ?? '-');
        setName(sidebarData.name ?? '-');
        setProfilPicture(sidebarData.profilPicture ?? '-');
        setPromo(sidebarData.promo ?? '-');
        setSemester(sidebarData.semester ?? '-');
    }, [sidebarData]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const generateCreditPhrase = (credits, neededCredits, availableCredits, status) => {

        switch (status) {
            case 'requirement_met':
                return `You have reached the required ${neededCredits} credits for this year. You currently have ${credits} credits and you can obtain ${availableCredits} credits.`;
            case 'requirement_attainable':
                return `You currently have ${credits} credits, ${neededCredits - credits} credits below the required ${neededCredits}. However, you can obtain ${availableCredits} more credits to meet the requirement.`;
            case 'credits_below_requirement':
                return `You currently have ${credits} credits, ${neededCredits - credits} credits below the required ${neededCredits}. Unfortunately, you can't meet the requirement with ${availableCredits} more available credits.`;
            default:
                return 'Credit information is currently unavailable.';
        }
    };

    useEffect(() => {
        if (creditsRequirement) {
            const { credits, neededCredits, availableCredits, status } = creditsRequirement;
            const phrase = generateCreditPhrase(credits, neededCredits, availableCredits, status);
            setCreditPhrase(phrase);
        }
    }, [creditsRequirement]);

    if (!showSidebar) {
        return (
            <>
                <IconButton
                    sx={{
                        position: 'fixed',
                        left: '0px',
                        bottom: '50%',
                        transform: 'translateY(50%)',
                        backgroundColor: '#d0d5db',
                        padding: '6 5 6 5',
                        borderRadius: '0 10px 10px 0',
                        boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.2)',
                        zIndex: 100,
                        '&:hover': {
                            backgroundColor: '#c4c8cc',
                        },
                    }}
                    onClick={toggleSidebar}
                >
                    {sidebarOpen ? "<" : ">"}
                </IconButton>
                {sidebarOpen && (
                    <SidebarRender
                        city={city}
                        cursus={cursus}
                        email={email}
                        name={name}
                        profilPicture={profilPicture}
                        promo={promo}
                        semester={semester}
                        creditPhrase={creditPhrase}
                    />
                )}
            </>
        );
    }

    return (
        <SidebarRender
            city={city}
            cursus={cursus}
            email={email}
            name={name}
            profilPicture={profilPicture}
            promo={promo}
            semester={semester}
            creditPhrase={creditPhrase}
        />
    )
};

export default Sidebar;
