import './Dashboard.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import ActiveTimeChart from './ActiveTimeChart';
import ActivityList from './ActiveList';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TimelineComponent from './TimelineComponent';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Dashboard() {

  const ButtonSideNav = ({ text, onClick }) => {
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <Button variant="contained" size="large" style={{ backgroundColor: '#212b37', color: 'aliceblue', width: '10%', padding: '15px', margin: '20px 20px', borderRadius: '10px', fontSize: '1.0rem', fontWeight: 'bolder', display: 'flex', alignItems: 'center', textTransform: 'none' }} onClick={handleClick}>
        {text}
      </Button>
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
        sx={{ background: '#181c25', color: '#fff', width: '100%', padding: '10px', textAlign: 'center', marginBottom: '20px', margin: '10px', borderRadius: '10px', border: '1px solid #87ceeb' }}>
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
    _profilPicture: 'basic_profil_picture.png',
    _city: '-'
  });

  const [importantDataCard, setImportantDataCard] = useState({
    _credits: '-',
    _GPA: '-',
    _highestTEpitech: '-'
  });

  const [timeChartData, setTimeChartData] = useState({
    _last7DayActiveTime: undefined,
    _myTotalActualWeekHour: undefined,
    _averageTotalActualWeekHour: undefined,
    _mytotalYearHour: undefined,
    _averageTotalYearHour: undefined,
    _myTotalLastWeekHour: undefined,
    _averageTotalLastWeekHour: undefined
  });

  const [roadBlockData, setRoadBlockData] = useState({
    _roadBlocksList: undefined
  });

  const [meXPHubVar, setHubData] = useState({
    _XPHub_me: undefined,
    _XPHub_xpAct: undefined
  });

  const [msgAlertData, setMsgAlertData] = useState({
    _message: undefined,
    _alert: undefined
  });

  const [timeLineData, setTimeLineData] = useState({
    _timeLineData: undefined
  });


  const [dashboardUpdate, setDashboardUpdate] = useState({
    _projectInProgress: undefined,
    _activitesAtCurrentWeek: undefined
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

    const handleTimeLineData = (event) => {
      const { detail } = event;
      setTimeLineData(detail);
    };

    const handleDashboardUpdate = (event) => {
      const { detail } = event;
      setDashboardUpdate(detail);
    };

    window.addEventListener('sidebar-update', handleSidebarUpdate);
    window.addEventListener('importantDataCard-update', handleimportantDataCardUpdate);
    window.addEventListener('activeTimeChart-update', handleTimeChartData);
    window.addEventListener('roadBlock-update', handleRoadBlockData);
    window.addEventListener('xpHub-update', handleHubData);
    window.addEventListener('messageAndAlert-update', handleMsgAlertData);
    window.addEventListener('timeLine-update', handleTimeLineData);
    window.addEventListener('dashboard-update', handleDashboardUpdate);

    return () => {
      window.removeEventListener('sidebar-update', handleSidebarUpdate);
      window.removeEventListener('importantDataCard-update', handleimportantDataCardUpdate);
      window.removeEventListener('activeTimeChart-update', handleTimeChartData);
      window.removeEventListener('roadBlock-update', handleRoadBlockData);
      window.removeEventListener('xpHub-update', handleHubData);
      window.removeEventListener('messageAndAlert-update', handleMsgAlertData);
      window.removeEventListener('timeLine-update', handleTimeLineData);
      window.removeEventListener('dashboard-update', handleDashboardUpdate);
    };
  }, []);

  const { _prenom, _email, _cursus, _semester, _promo, _profilPicture, _city } = userInformation;
  const { _credits, _GPA, _highestTEpitech } = importantDataCard;
  const { _last7DayActiveTime, _myTotalActualWeekHour, _averageTotalActualWeekHour, _mytotalYearHour, _averageTotalYearHour, _myTotalLastWeekHour, _averageTotalLastWeekHour } = timeChartData;
  const { _roadBlocksList } = roadBlockData;
  const { _XPHub_me, _XPHub_xpAct } = meXPHubVar;
  const { _message, _alert } = msgAlertData;
  const { _timeLineData } = timeLineData;
  const { _projectInProgress, _activitesAtCurrentWeek } = dashboardUpdate;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className='DashBoard'>
      <div className='Main' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='MainUserInfo1'>
          <img src={_profilPicture} alt="Avatar" className="avatar" />
          <div className='infoUser' style={{ display: 'flex', flexDirection: 'column' }}>
            <WriteSideDate data1="Name: " data2={_prenom} />
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
            <div style={{ marginLeft: 'auto' }}>
              <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
              <NotificationsIcon color="red" fontSize="large" />
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                PaperProps={{
                  style: {
                    backgroundColor: '#212b37',
                    color: 'aliceblue',
                  },
                }}
                ListProps={{
                  style: {
                    backgroundColor: '#212b37',
                    color: 'aliceblue',
                  },
                }}
              >
              <MenuItem style={{ fontWeight: 'bold' }}>Informations</MenuItem>
              {msgAlertData && _message &&
                _message.map((item, index) => (
                  <MenuItem style={{ margin: '10px' }} key={index}>
                    {item.title.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '').replace(/\s*by\s*/, '')}
                  </MenuItem>
                ))}
              <MenuItem style={{ fontWeight: 'bold' }}>Alerts</MenuItem>
              {msgAlertData && _alert &&
                _alert.map((item, index) => (
                  <MenuItem style={{ margin: '10px' }} key={index}>
                    {item.title.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '').replace(/\s*by\s*/, '')}
                  </MenuItem>
                ))}
            </Menu>
          </div>
          </div>
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            {dashboard && <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px' }}>
              <div style={{ display: 'flex', width: '100%', }}>
                <StyledBox text1={_credits} text2="Credits" />
                <StyledBox text1={_GPA} text2="G.P.A" />
                <StyledBox text1={_highestTEpitech} text2="best TEPitech" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10px', height: '100%' }}>
                <div className='TimelogBox' style={{ flex: 1, marginRight: '10px' }}>
                  {_projectInProgress && (
                    <div>
                      <h1 style={{ fontSize: '20px' }}>It ends this week...</h1>
                      <hr />
                      {_projectInProgress.length > 0 ? (
                        <div>
                          {_projectInProgress.map((item, index) => (
                            item.deadLineThisWeek && (
                              <div key={index}>
                                <h2 style={{ textAlign: 'left' }}>{item.title}</h2>
                              </div>
                            )
                          ))}
                        </div>
                      ) : (
                        <h2 className="small-text">No projects to finish this week.</h2>
                      )}
                      <hr />
                    </div>
                  )}
                </div>
                <div className='TimelogBox3' style={{ flex: 1, marginLeft: '10px' }}>
                  {_activitesAtCurrentWeek && (
                    <div>
                      <h1 style={{ fontSize: '20px' }}>This week, there is:</h1>
                      <hr />
                      {_activitesAtCurrentWeek.map((item, index) => (
                        <div key={index}>
                          <h2>{item.acti_title}</h2>
                          <p style={{ textAlign: 'left' }}>{item.begin} - {item.end}</p>
                        </div>
                      ))}
                      <hr />
                    </div>
                  )}
                </div>
              </div>
            </div>}
            {roadblocks && (<div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
              <div className="RoadblockContainer">
                {_roadBlocksList &&
                  _roadBlocksList.map((item, index) => {
                    return (
                      <div key={index} className="RoadblockBox">
                        <h3 style={{ fontSize: '1.5rem', marginTop: '1px', color: 'white' }}>
                          <span>{item.type}</span>&nbsp;
                          <span style={{ color: item.actual_student_credits < item.credit_needed ? 'red' : 'green' }} title="actual student credits / credit need to validate the roadblock">
                            {item.actual_student_credits}/{item.credit_needed}
                          </span>
                          <span style={{
                            color: item.available_credits < item.credit_needed ? 'red' : 'white', fontSize: '0.8em' }}
                            title={item.available_credits < item.credit_needed ? 'You can not have enough credits to validate the roadblock' : 'available credits for selected modules'}>
                            ({item.available_credits})
                          </span>
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
                                {module.color === 'green' ? `${module.name.replace(/\b[A-Z0-9]{2}\s-\s/g, '')} - Grade ${module.student_grade}` : (module.color === 'red' ? `${module.name.replace(/\b[A-Z0-9]{2}\s-\s/g, '')} - Grade E` : module.name.replace(/\b[A-Z0-9]{2}\s-\s/g, ''))}
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
            {hub && _XPHub_me && <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px', overflowY:'scroll', height:'95%' }}>
              <div style={{ display: 'flex', width: '100%', }}>
                <StyledBox text1={(_XPHub_me?.nbXps ?? '-') + " XP"} text2="Acquired" />
                <StyledBox text1={(_XPHub_me?.nbXpsSoon ?? '-') + " XP"} text2="In progress" />
              </div>
              <ActivityList activList={_XPHub_me.activList} xpAct={_XPHub_xpAct} />
            </div>}
            {timeline && _timeLineData && <div style={{ width: '100%', height:'100%' }}>
              <div className='timelineBox'>
                {<TimelineComponent projects={_timeLineData}/>}
              </div>
            </div>}
            {timelog && (
              <div style={{ display: 'flex', width: '100%' }}>
                <ActiveTimeChart
                  data={{
                    _last7DayActiveTime,
                    _myTotalLastWeekHour,
                    _averageTotalLastWeekHour,
                    _myTotalActualWeekHour,
                    _averageTotalActualWeekHour,
                    _mytotalYearHour,
                    _averageTotalYearHour
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;