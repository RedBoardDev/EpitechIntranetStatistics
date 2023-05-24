import './Dashboard.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ActiveTimeChart from './ActiveTimeChart';
import ActivityList from './ActiveList';
import parse from 'html-react-parser';

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
        <h1>{text1}</h1>
        <h3>{text2}</h3>
      </Box>
    );
  };

  const [dashboard, setDashboard] = useState(true);
  const [roadblocks, setRoadblocks] = useState(false);
  const [hub, setHub] = useState(false);
  const [timeline, setTimeline] = useState(false);
  const [timelog, setTimelog] = useState(false);

  const DashboardFunc = () => {
    setDashboard(true);
    setRoadblocks(false);
    setHub(false);
    setTimeline(false);
    setTimelog(false);
  };

  const RoadblocksFunc = () => {
    setDashboard(false);
    setRoadblocks(true);
    setHub(false);
    setTimeline(false);
    setTimelog(false);
  };

  const HubFunc = () => {
    setDashboard(false);
    setRoadblocks(false);
    setHub(true);
    setTimeline(false);
    setTimelog(false);
  };

  const TimelineFunc = () => {
    setDashboard(false);
    setRoadblocks(false);
    setHub(false);
    setTimeline(true);
    setTimelog(false);
  };

  const TimeLogFunc = () => {
    setDashboard(false);
    setRoadblocks(false);
    setHub(false);
    setTimeline(false);
    setTimelog(true);
  };

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
    _last7DayActiveTime: undefined
  });

  const [roadBlockData, setRoadBlockData] = useState({
    _roadBlocksList: undefined
  });

  const [meXPHubVar, setHubData] = useState({
    _meXPHubVar: undefined
  });

  const [msgAlertData, setMsgAlertData] = useState({
    _message: undefined,
    _alert: undefined
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

    const handleMsgAlertData = (event) => {
      const { detail } = event;
      setMsgAlertData(detail);
    };

    window.addEventListener('sidebar-update', handleSidebarUpdate);
    window.addEventListener('importantDataCard-update', handleimportantDataCardUpdate);
    window.addEventListener('activeTimeChart-update', handleTimeChartData);
    window.addEventListener('roadBlock-update', handleRoadBlockData);
    window.addEventListener('xpHub-update', handleHubData);
    window.addEventListener('messageAndAlert-update', handleMsgAlertData);

    return () => {
      window.removeEventListener('sidebar-update', handleSidebarUpdate);
      window.removeEventListener('importantDataCard-update', handleimportantDataCardUpdate);
      window.removeEventListener('activeTimeChart-update', handleTimeChartData);
      window.removeEventListener('roadBlock-update', handleRoadBlockData);
      window.removeEventListener('xpHub-update', handleHubData);
      window.removeEventListener('messageAndAlert-update', handleMsgAlertData);
    };
  }, []);

  const { _prenom, _email, _cursus, _semester, _promo, _profilPicture, _city } = userInformation;
  const { _credits, _GPA, _highestTEpitech } = importantDataCard;
  const { _last7DayActiveTime } = timeChartData;
  const { _roadBlocksList } = roadBlockData;
  const { _meXPHubVar } = meXPHubVar;
  const { _message, _alert } = msgAlertData;

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
            <ButtonSideNav text="Timelog" onClick={TimeLogFunc} />
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
                  oui
                </div>
                <div className='TimelogBox1'>
                  <h1>INFO:</h1>
                  {msgAlertData && _message &&
                    _message.map((item, index) => (
                      <h2 style={{ margin: '10px' }} key={index}>
                        {parse(item.title, {
                          replace: (domNode) => {
                            if (domNode.type === 'text') {
                              return <span style={{ fontWeight: 'light', color: 'lightgrey' }}>{domNode.data}</span>;
                            } else if (domNode.type === 'tag' && domNode.name === 'a') {
                              const url = domNode.attribs.href;
                              const updatedUrl = url
                                .split('/')
                                .slice(3)
                                .join('/');
                              return (
                                <a
                                  href={`https://intra.epitech.eu/${updatedUrl}`}
                                  style={{ fontWeight: 'bold', color: 'lightgrey' }}
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {domNode.children[0].data}
                                </a>
                              );
                            }
                            return null;
                          }
                        })}
                      </h2>
                    ))}
                  <h1>ALERTE:</h1>
                  {msgAlertData && _alert &&
                    _alert.map((item, index) => (
                      <h2 style={{ margin: '10px' }} key={index}>
                        {parse(item.title, {
                          replace: (domNode) => {
                            if (domNode.type === 'text') {
                              return <span style={{ fontWeight: 'light', color: 'lightgrey' }}>{domNode.data}</span>;
                            } else if (domNode.type === 'tag' && domNode.name === 'a') {
                              const url = domNode.attribs.href;
                              const updatedUrl = url
                                .split('/')
                                .slice(3)
                                .join('/');
                              return (
                                <a
                                  href={`https://intra.epitech.eu/${updatedUrl}`}
                                  style={{ fontWeight: 'bold', color: 'lightgrey' }}
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {domNode.children[0].data}
                                </a>
                              );
                            }
                            return null;
                          }
                        })}
                      </h2>
                    ))}
                </div>
              </div>}
            </div>}
            {roadblocks && (<div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                <div className="RoadblockContainer">
                  {_roadBlocksList &&
                    _roadBlocksList.map((item, index) => {
                      // Calculer le total des crédits des modules
                      const totalCredits = item.modules.reduce((acc, module) => acc + module.credits, 0);
                      const totalUserCredits = item.modules.reduce((acc, module) => acc + module.student_credits, 0);
                      const availableCredits = item.modules.reduce((acc, module) => {
                        if (module.user_credits !== null) {
                          return acc + Number(module.user_credits);
                        }
                        return acc;
                      }, 0);

                      return (
                        <div key={index} className="RoadblockBox">
                          <h3 style={{ fontSize: '1.5rem', marginTop: '1px' }}>
                            <span>{item.type}</span> {totalUserCredits}/{availableCredits} ({totalCredits})
                          </h3>
                          {item.modules.map((module, moduleIndex) => {
                            let textColor;

                            switch (module.color) {
                              case 'orange':
                                textColor = 'white';
                                break;
                              case 'green':
                                textColor = 'green';
                                break;
                              case 'red':
                                textColor = 'red';
                                break;
                              default:
                                textColor = 'gray';
                                break;
                            }

                            return (
                              <h4
                                key={moduleIndex}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  color: textColor,
                                }}
                              >
                                <span style={{ alignSelf: 'flex-start', fontSize: '20px' }}>
                                  {module.color === 'green' || module.color === 'red' ? `${module.name.replace(/\b[A-Z0-9]{2}\s-\s/g, '')} - Grade ${module.student_grade}` : module.name.replace(/\b[A-Z0-9]{2}\s-\s/g, '')}
                                </span>
                                <span style={{ fontSize: '20px' }}>
                                  {module.student_credits}/{module.credits} credits
                                </span>
                              </h4>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
            {hub && <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px', overflowY:'scroll', height:'95%' }}>
              <div style={{ display: 'flex', width: '100%', }}>
                <StyledBox text1={(_meXPHubVar?.nbXps ?? '-') + " XP"} text2="Acquired" />
                <StyledBox text1={(_meXPHubVar?.nbXpsSoon ?? '-') + " XP"} text2="Remaining" />
              </div>
              <ActivityList activList={_meXPHubVar.activList} totalXp={_meXPHubVar.nbXps} />
              {/* <ActivityList activList={_meXPHubVar.activList, _meXPHubVar.nbXps}/> */}
            </div>}
            {timeline && <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px' }}>
              <div className='timelineBox'>
                oui
              </div>
            </div>}
            {timelog && (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                <div className='infoTimeBox1'>
                  ouais
                </div>
                <div className='infoTimeBox2'>
                  {<ActiveTimeChart data={_last7DayActiveTime} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
