import * as React from 'react';
import { Box, Stack, Divider, Typography } from '@mui/material';
import '../css/Scrollable.css';
import { useState } from 'react';
import { chartink_strategy2 } from '../constants/ChartInkStrategy';
import jaguarlogo from '../images/jaguar-logo.jpg';
import { ColorCodes } from '../constants/ColorCodes.jsx';
import TutorialModal from '../components/TutorialModal.jsx';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

export default function CarousalBar() {
  const style = {
    borderRadius: '0.5rem',
    padding: '1rem',
    fontWeight: 'bold',
    cursor: 'default',
    backgroundColor: ColorCodes.element,
  };

  const [show, setShow] = useState(false);
  const [tutorialModalShow, setTutorialModalShow] = useState(false);

  const hide = () => setShow(false);
  const handleTutorialShow = () => {
    setTutorialModalShow(!tutorialModalShow);
  };

  return (
    <Box sx={{ flexGrow: 1, color: ColorCodes.text }}>
      <Logo></Logo>
      <Stack
        spacing={3}
        direction="row"
        className="scrollable-content"
        style={{ paddingLeft: '1rem' }}
      >
        <Box
          style={{ ...style, verticalAlign: 'middle', display: 'flex' }}
          onClick={() => setShow(!show)}
        >
          <TroubleshootIcon style={{ marginRight: '3px' }}></TroubleshootIcon>
          <Typography style={{ fontWeight: 'bold' }}>Scanners</Typography>
        </Box>
        <Box
          style={{
            verticalAlign: 'middle',
            display: 'flex',
            ...style,
          }}
          onClick={handleTutorialShow}
        >
          <AssignmentIcon style={{ marginRight: '3px' }}></AssignmentIcon>
          <Typography style={{ fontWeight: 'bold' }}>Tutorial</Typography>
        </Box>
      </Stack>
      {show && <Scanners style={style} hide={hide}></Scanners>}
      <Divider
        color={ColorCodes.element}
        style={{ marginTop: '1rem' }}
      ></Divider>
      <TutorialModal
        show={handleTutorialShow}
        open={tutorialModalShow}
      ></TutorialModal>
    </Box>
  );
}

function Scanners(props) {
  const menuItems = [];

  chartink_strategy2.forEach((strategy) => {
    if (strategy.display) {
      menuItems.push(
        <a
          href={strategy.link}
          target="_blank"
          style={{ textDecoration: 'none', color: ColorCodes.text }}
          rel="noreferrer"
          key={strategy.name}
          onClick={props.hide}
        >
          <Box key={strategy.name} style={props.style}>
            {strategy.name}
          </Box>
        </a>
      );
    }
  });

  return (
    <Stack
      spacing={4}
      direction="row"
      className="scrollable-content"
      style={{ paddingLeft: '1rem', marginTop: '1rem', marginBottom: '1rem' }}
    >
      {menuItems}
    </Stack>
  );
}

function Logo() {
  const style = {
    height: '3rem',
    width: '3rem',
    borderRadius: '50%',
    border: '2px dashed ' + ColorCodes.element,
    padding: '2px',
  };
  return (
    <Box
      style={{
        textAlign: 'left',
        paddingLeft: '1rem',
        marginBottom: '0.5rem',
        paddingTop: '1rem',
      }}
    >
      <img src={jaguarlogo} alt="Jaguar Trading" style={style}></img>
    </Box>
  );
}
