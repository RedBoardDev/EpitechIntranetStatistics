import './Dashboard.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ActiveTimeChart from './ActiveTimeChart';
import ActivityList from './ActiveList';

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

  var xpacquired = "20";
  var xpremaining = "2";
  const data = [
    { status: 'true', roadblock: 'Roadblock1', userCredits: "4", mandatoryCredits: "8", nbCredits: '10', modules: ['module1', 'module2'] },
    { status: 'false', roadblock: 'Roadblock2', userCredits: "4", mandatoryCredits: "8", nbCredits: '10', modules: ['module1', 'module2', 'module3', 'module4'] },
    { status: 'true', roadblock: 'Roadblock3', userCredits: "4", mandatoryCredits: "8", nbCredits: '10', modules: ['module1', 'module2', 'module3', 'module4'] },
    { status: 'true', roadblock: 'Roadblock4', userCredits: "4", mandatoryCredits: "8", nbCredits: '10', modules: ['module1', 'module2'] },
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

  const [timeChartData, setTimeChartData] = useState({
    _timeLogChart: undefined
  });

  const [roadBlockData, setRoadBlockData] = useState({
    _roadBlocksList: undefined
  });

  const [meXPHubVar, setHubData] = useState({
    _meXPHubVar: undefined
  });

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  useEffect(() => {
    const handleSidebarUpdate = (event) => {
      const { detail } = event;
      setUserInformation(detail);
    };

    const handleimportantDataCardUpdate = (event) => {
      const { detail } = event;
      setImportantDataCard(detail);
    };

    const handleTimeChartData = (event) => {
      const { detail } = event;
      setTimeChartData(detail);
    };

    const handleRoadBlockData = (event) => {
      const { detail } = event;
      setRoadBlockData(detail);
    };

    const handleHubData = (event) => {
      const { detail } = event;
      setHubData(detail);
    };

    window.addEventListener('sidebar-update', handleSidebarUpdate);
    window.addEventListener('importantDataCard-update', handleimportantDataCardUpdate);
    window.addEventListener('activeTimeChart-update', handleTimeChartData);
    window.addEventListener('roadBlock-update', handleRoadBlockData);
    window.addEventListener('xpHub-update', handleHubData);
    
    return () => {
      window.removeEventListener('sidebar-update', handleSidebarUpdate);
      window.removeEventListener('importantDataCard-update', handleimportantDataCardUpdate);
      window.removeEventListener('activeTimeChart-update', handleTimeChartData);
      window.removeEventListener('roadBlock-update', handleRoadBlockData);
      window.removeEventListener('xpHub-update', handleHubData);
    };
  }, []);

  const { _prenom, _email, _cursus, _semester, _promo, _profilPicture, _city } = userInformation;
  const { _credits, _GPA, _highestTEpitech } = importantDataCard;
  const { _timeLogChart } = timeChartData;
  const { _roadBlocksList } = roadBlockData;
  const { _meXPHubVar } = meXPHubVar;

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
          <div style={{ display: 'flex', width: '100%', height: '100%'}}>
            {dashboard && <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px' }}>
              <div style={{ display: 'flex', width: '100%', }}>
                <StyledBox text1={_credits} text2="Credits" />
                <StyledBox text1={_GPA} text2="G.P.A" />
                <StyledBox text1={_highestTEpitech} text2="best TEPitech" />
              </div>
              {<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10px', height: '100%'}}>
                <div className='TimelogBox'>
                  {<div className="charte-container">
                    {<ActiveTimeChart data={_timeLogChart} />}
                  </div>}
                </div>
                <div className='TimelogBox1'>
                  Oui
                </div>
              </div>}
            </div>}
            {roadblocks && (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                <div className="RoadblockContainer">
                  {_roadBlocksList &&
                    _roadBlocksList.map((item, index) => {
                      // Calculer le total des crédits des modules
                      const totalCredits = item.modules.reduce((acc, module) => acc + module.credits, 0);
                      const totalUserCredits = item.modules.reduce((acc, module) => acc + module.student_credits, 0);

                      return (
                        <div key={index} className="RoadblockBox">
                          <h3 style={{ fontSize: '1.5rem', marginTop: '1px' }}>
                            <span>{item.type}</span> {totalUserCredits}/{totalCredits}
                          </h3>
                          {item.modules.map((module, moduleIndex) => (
                            <h4 style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              <span style={{ alignSelf: 'flex-start', fontSize: '20px' }}>{module.name}</span>
                              <span style={{ fontSize: '20px' }}>{module.student_credits}/{module.credits} credits</span>
                            </h4>
                          ))}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
            {hub && <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px' }}>
              <div style={{ display: 'flex', width: '100%', }}>
                <StyledBox text1={_meXPHubVar?.nbXps ?? '-' + " XP"} text2="Acquired" />
                <StyledBox text1={_meXPHubVar?.nbXpsSoon ?? '-' + " XP"} text2="Remaining" />
              </div>
              <ActivityList activList={_meXPHubVar.activList}/>
              {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10px', height: '100%'}}>
                <div className='HubBox'>
                  {_meXPHubVar && _meXPHubVar.map((item, index) => (
                    <div key={index} className="ActivityBox">
                      <span
                        style={{ fontSize: '1.5rem'}}
                        onClick={() => handleToggle(index)}
                      >
                        {item.roadblock}
                      </span>
                      <ul>
                        {item.modules.map((module, moduleIndex) => (
                          <p
                            key={moduleIndex}
                            className={item.status === "true" ? 'module-green' : 'module-red'} // Applique une classe différente en fonction de item.status
                          >
                            {module}
                          </p>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className='HubBox'>
                  {data.map((item, index) => (
                    <div key={index} className="ActivityBox">
                      <span
                        style={{ fontSize: '1.5rem'}}
                        onClick={() => handleToggle(index)}
                      >
                        {item.roadblock}
                      </span>
                      <ul>
                        {item.modules.map((module, moduleIndex) => (
                          <p
                            key={moduleIndex}
                            className={item.status === "true" ? 'module-green' : 'module-red'} // Applique une classe différente en fonction de item.status
                          >
                            {module}
                          </p>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>}
            {timeline && <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px' }}>
              <div className='timelineBox'>
                oui
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
