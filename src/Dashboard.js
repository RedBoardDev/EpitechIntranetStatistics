import './Dashboard.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

function Dashboard() {
  const navigate = useNavigate();

  const ButtonSideNav = ({ text, onClick }) => {
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <Button variant="contained" size="large" style={{ backgroundColor: '#212b37', color: 'aliceblue', width: '10%', padding: '15px', margin: '20px 20px', borderRadius: '10px', fontSize: '1.0rem', fontWeight: 'bolder', display: 'flex', alignItems: 'center', textTransform: 'none',}} onClick={handleClick}>
        {text}
      </Button>
    );
  };

  const GradientBox = ({ text, secondText, colors }) => {
    const gradient = `linear-gradient(to bottom, ${colors.join(', ')})`;
    return (
      <Box component="span" sx={{ p: 2, background: gradient, width: '20%', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: '10px', fontSize: '1.5rem', fontWeight: 'bolder',}}>
        {text}
        <Box sx={{ fontSize: '1.0rem', fontWeight: 'normal' }}>
          {secondText}
        </Box>
      </Box>
    );
  };

  const WriteSideDate = ({ data1, data2, data3 }) => {
    return (
      <p style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ marginLeft: '3%', marginRight: '1rem' }}>{data1}</span>
        <span style={{ marginRight: '1rem', fontWeight: 'bold' }}>{data2} {data3}</span>
      </p>
    );
  };

  const StyledBox = ({ text1, text2 }) => {
    return (
      <Box
        sx={{ background: '#181c25', color: '#fff', width: '100%', padding: '10px', textAlign: 'center', marginBottom: '20px', margin: '10px', borderRadius: '10px', border: '1px solid #87ceeb'}}>
        <h2>{text1}</h2>
        <p>{text2}</p>
      </Box>
    );
  };

  const [dashboard, setDashboard] = useState(true);
  const [roadblocks, setRoadblocks] = useState(false);
  const [hub, setHub] = useState(false);
  const [timeline, setTimeline] = useState(false);

  const DashboardFunc = () => {
    setDashboard(true);
    setRoadblocks(false);
    setHub(false);
    setTimeline(false);
  };

  const RoadblocksFunc = () => {
    setDashboard(false);
    setRoadblocks(true);
    setHub(false);
    setTimeline(false);
  };

  const HubFunc = () => {
    setDashboard(false);
    setRoadblocks(false);
    setHub(true);
    setTimeline(false);
  };

  const TimelineFunc = () => {
    setDashboard(false);
    setRoadblocks(false);
    setHub(false);
    setTimeline(true);
  };

  // var prenom = "bah";
  // var nom = "OUAIS";
  // var email = "bah.oauis@gmail.com";
  // var city = "Mulhouse";
  // var cursus = "Bachelor";
  // var semester = "B4";
  // var promo = "2026";
  // var credits = "42";
  // var gpa = "3.5";
  // var tepitech = "700";
  const data = [
    { roadblock: 'Roadblock1', userCredits: "4", mandatoryCredits: "8", nbCredits: '10', modules: ['module1', 'module2'] },
    { roadblock: 'Roadblock2', userCredits: "4", mandatoryCredits: "8", nbCredits: '10', modules: ['module1', 'module2', 'module3', 'module4'] },
    { roadblock: 'Roadblock3', userCredits: "4", mandatoryCredits: "8", nbCredits: '10', modules: ['module1', 'module2', 'module3', 'module4', 'module2', 'module3', 'module4', 'module2', 'module3', 'module4'] },
    { roadblock: 'Roadblock4', userCredits: "4", mandatoryCredits: "8", nbCredits: '10', modules: ['module1', 'module2'] },
  ];

  const [userInformation, setUserInformation] = useState({
    _prenom: '-',
    _email: '-',
    _cursus: '-',
    _semester: '-',
    _promo: '-',
    _profilPicture: '-',
    _city: '-'
  });

  const [importantDataCard, setImportantDataCard] = useState({
    _credits: '-',
    _GPA: '-',
    _highestTEpitech: '-'
  });

  useEffect(() => {
    const handleSidebarUpdate = (event) => {
      const { detail } = event;
      setUserInformation(detail);
    };

    const handleimportantDataCardUpdate = (event) => {
      const { detail } = event;
      setImportantDataCard(detail);
    };

    window.addEventListener('sidebar-update', handleSidebarUpdate);
    window.addEventListener('importantDataCard-update', handleimportantDataCardUpdate);

    return () => {
      window.removeEventListener('sidebar-update', handleSidebarUpdate);
      window.removeEventListener('importantDataCard-update', handleimportantDataCardUpdate);
    };
  }, []);

  const { _prenom, _email, _cursus, _semester, _promo, _profilPicture, _city } = userInformation;
  const { _credits, _GPA, _highestTEpitech } = importantDataCard;

  return (
    <div className='DashBoard'>
      <div className='Main' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='MainUserInfo1'>
          <img src={_profilPicture} alt="Avatar" className="avatar" />
          <div className='infoUser' style={{ display: 'flex', flexDirection: 'column' }}>
            <WriteSideDate data1="Name: " data2={_prenom}/>
            <WriteSideDate data1="E-mail: " data2={_email} />
            <WriteSideDate data1="Cursus: " data2={_cursus} />
            <WriteSideDate data1="Semester: " data2={_semester} />
            <WriteSideDate data1="City: " data2={_city} />
            <WriteSideDate data1="Promotion: " data2={_promo} />
          </div>
        </div>
        <div className='MainUserInfo2'>
          <div className="TopBar1">
            <ButtonSideNav text="Dashboard" onClick={DashboardFunc} />
            <ButtonSideNav text="Roadblocks" onClick={RoadblocksFunc} />
            <ButtonSideNav text="Hub" onClick={HubFunc} />
            <ButtonSideNav text="Timeline" onClick={TimelineFunc} />
          </div>
          <div style={{ display: 'flex', width: '100%', height: '100%', overflow: 'auto'}}>
            {dashboard && <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px' }}>
              <div style={{ display: 'flex', width: '100%', }}>
                <StyledBox text1={_credits} text2="Credits" />
                <StyledBox text1={_GPA} text2="G.P.A" />
                <StyledBox text1={_highestTEpitech} text2="best TEPitech" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10px', height: '100%'}}>
                <div className='TimelogBox'>
                  Timelog
                </div>
                <div className='TimelogBox1'>
                  Oui
                </div>
              </div>
            </div>}
            {roadblocks && <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px' }}>
            <div className="RoadblockContainer">
              {data.map((item, index) => (
                <div key={index} className="RoadblockBox">
                  <h3 style={{ fontSize: '1.5rem' }}>
                    <span>{item.roadblock}</span> {item.userCredits}/ {item.mandatoryCredits} ({item.nbCredits})
                  </h3>
                  <ul>
                    {item.modules.map((module, moduleIndex) => (
                      <li key={moduleIndex}>{module}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            </div>}
            {hub && <div>
              hub
            </div>}
            {timeline && <div>
              time
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
