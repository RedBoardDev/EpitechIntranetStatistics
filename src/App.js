import React from 'react';
import { Box } from '@mui/material';
import Layout from './Layout';
import { COLORS, BOX_SHADOW, BORDER_RADIUS } from './styles.js';
import Announcement from './components/AnnouncementHandler.js';

const App = () => {
    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            window.parent.postMessage({ type: 'outsideClick' }, '*');
        }
    }

    const overlayStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw',
        zIndex: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };

    const appStyle = {
        height: '66vh',
        width: '66vw',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1'
    };

    return (
        <div onClick={handleOverlayClick} style={overlayStyle}>
            <div style={appStyle}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        bgcolor: '#F0EFF4',
                        color: '#1F364D',
                        borderRadius: BORDER_RADIUS.main,
                        // boxShadow: BOX_SHADOW.mainBackground,
                        backgroundColor: COLORS.mainBackground,
                        padding: 2,
                        boxSizing: 'border-box',
                    }}
                >
                    <Layout />
                </Box>

                <Announcement
                    id="announce-001"
                    titles={[
                        "Découvrez la toute nouvelle version !",
                        "Partagez votre expérience et vos suggestions !",
                        "Contribuez à la mise à jour des données !"
                    ]}
                    messages={[
                        <p>
                            Il y a un an, nous avons lancé la première version de notre extension pour l'intranet d'Epitech.<br />
                            Aujourd'hui, nous sommes ravis de vous présenter une mise à jour majeure : notre extension s'ouvre désormais directement dans une popup, offrant un accès plus rapide à vos statistiques.<br />
                            L'interface a été repensée pour une meilleure expérience utilisateur, avec l'ajout de nouvelles données pour enrichir votre vue d'ensemble de l'année scolaire, et plus encore à venir.
                        </p>,
                       <p>
                       Cette version est encore en cours d'amélioration, donc des bugs pourraient subsister.<br />
                       Vos retours sont essentiels pour nous aider à les résoudre et à améliorer l'extension.<br />
                       Utilisez les <a href="https://github.com/RedBoardDev/EpitechIntranetStatistics/issues" target="_blank" rel="noopener noreferrer"> issues GitHub</a> pour partager vos suggestions et signaler les problèmes rencontrés.
                   </p>,
                        <p>
                            Vous pouvez aussi contribuer à maintenir les données de l'extension à jour.<br />
                            Certaines informations ne sont pas récupérables depuis l'intranet d'Epitech et doivent être actualisées dans le fichier
                            <a href="https://github.com/RedBoardDev/EpitechIntranetStatistics/blob/refonte/public/scripts/data/epitech_data.js" target="_blank" rel="noopener noreferrer"> epitech_data.js</a>.<br />
                            Signalez toute erreur via les <a href="https://github.com/RedBoardDev/EpitechIntranetStatistics/issues" target="_blank" rel="noopener noreferrer"> issues GitHub</a> pour garantir la précision des données fournies.
                        </p>
                    ]}
                />
            </div>
        </div>

    );
};

export default App;
// issues GitHub