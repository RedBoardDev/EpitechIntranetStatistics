import './Hub.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Hub() {
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
          margin: '10px 10px',
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
    <div className="SidePanel">
      <ButtonSideNav text="Dashboard" onClick={Dashboard} />
      <ButtonSideNav text="Roadblocks" onClick={Roadblocks} />
      <ButtonSideNav text="Hub" onClick={Hub} />
      <ButtonSideNav text="Timeline" onClick={Timeline} />
    </div>
  );
}

export default Hub;
