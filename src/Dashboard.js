import './Dashboard.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const ButtonSideNav = ({ text, onClick }) => {
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <Button
        variant="contained"
        size="large"
        style={{
          backgroundColor: 'aliceblue',
          color: 'black',
          width: '10%',
          padding: '15px',
          margin: '20px 20px',
          borderRadius: '10px',
          fontSize: '1.0rem',
          fontWeight: 'bolder',
          display: 'flex',
          alignItems: 'center',
          textTransform: 'none',
        }}
        onClick={handleClick}
      >
        {text}
      </Button>
    );
  };

  const GradientBox = ({ text, secondText, colors }) => {
    const gradient = `linear-gradient(to right, ${colors.join(', ')})`;
    return (
      <Box
        component="span"
        sx={{
          p: 2,
          background: gradient,
          width: '20%',
          margin: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderRadius: '10px',
          fontSize: '1.5rem',
          fontWeight: 'bolder',
        }}
      >
        {text}
        <Box sx={{ fontSize: '1.0rem', fontWeight: 'normal' }}>
          {secondText}
        </Box>
      </Box>
    );
  };

  const Dashboard = () => {
    navigate('/');
  };

  const Roadblocks = () => {
    navigate('/roadblocks'); // Navigate to Roadblocks.js
  };

  const Hub = () => {
    navigate('/hub'); // Navigate to Hub.js
  };

  const Timeline = () => {
    navigate('/timeline'); // Navigate to Timeline.js
  };

  return (
    <div className='DashBoard'>
      <div className="TopBar">
        <ButtonSideNav text="Dashboard" onClick={Dashboard} />
        <ButtonSideNav text="Roadblocks" onClick={Roadblocks} />
        <ButtonSideNav text="Hub" onClick={Hub} />
        <ButtonSideNav text="Timeline" onClick={Timeline} />
      </div>
      <div className="BodyPanel">
        <GradientBox text="zerty" secondText="oui" colors={['#007bff', '#87ceeb']} />
        <GradientBox text="Hello" secondText="oui" colors={['#007bff', '#87ceeb']} />
        <GradientBox text="Box 3" secondText="oui" colors={['#007bff', '#87ceeb']} />
        <GradientBox text="Box 4" secondText="oui" colors={['#007bff', '#87ceeb']} />
      </div>
      <div className='MainDiv'>
        <div className='TimelogBox'>
          Ca se time le log
        </div>
        <div className='MainUserInfo'>
          Hello
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
