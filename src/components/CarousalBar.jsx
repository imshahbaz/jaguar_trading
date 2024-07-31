import * as React from 'react';
import { Box, Stack, Divider, Typography } from '@mui/material';
import '../css/Scrollable.css';
import { useState } from 'react';
import { chartink_strategy2 } from '../constants/ChartInkStrategy';
import jaguarlogo from '../images/starlogo.jpg';
import { ColorCodes } from '../constants/ColorCodes.jsx';
import TutorialModal from '../components/TutorialModal.jsx';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import MarginSearch from './MarginSearch.jsx';

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
  const [searchBarflag, setSearchBarflag] = useState(false);

  const hide = () => setShow(false);
  const handleTutorialShow = () => {
    setTutorialModalShow(!tutorialModalShow);
  };

  const display = (element) => {
    if (element === 'search') {
      setShow(false);
      setSearchBarflag(!searchBarflag);
    } else if (element === 'scanner') {
      setShow(!show);
      setSearchBarflag(false);
    }
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
          onClick={() => display('scanner')}
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
        <Box
          style={{ ...style, verticalAlign: 'middle', display: 'flex' }}
          onClick={() => display('search')}
        >
          <TroubleshootIcon style={{ marginRight: '3px' }}></TroubleshootIcon>
          <Typography style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            Search Margin
          </Typography>
        </Box>
      </Stack>

      {show && <Scanners style={style} hide={hide}></Scanners>}
      {searchBarflag && <MarginSearch></MarginSearch>}
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
            <Typography style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
              {strategy.name}
            </Typography>
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
    border: '2px dashed ' + ColorCodes.border,
    padding: '2px',
  };
  return (
    <Box
      style={{
        paddingLeft: '1rem',
        marginBottom: '1rem',
        paddingTop: '1rem',
        verticalAlign: 'middle',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
      }}
    >
      <img src={jaguarlogo} alt="Jaguar Trading" style={style}></img>
      <Typography
        style={{
          fontWeight: 'bold',
          color: ColorCodes.text,
          marginLeft: '8px',
          fontFamily: 'Times New Roman',
          fontSize: '2rem',
        }}
      >
        Star Gazer
      </Typography>
    </Box>
  );
}
