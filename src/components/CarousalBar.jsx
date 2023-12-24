import * as React from 'react';
import { Box, Stack, Divider } from '@mui/material';
import '../css/Scrollable.css';
import { useState } from 'react';
import { chartink_strategy2 } from '../constants/ChartInkStrategy';
import jaguarlogo from '../images/jaguar-logo.jpg';

const grey = '#1d1d1d';

export default function CarousalBar() {
  const style = {
    borderRadius: '0.5rem',
    border: '3px solid ' + grey,
    padding: '1rem',
    fontWeight: 'bold',
    cursor: 'default',
  };

  const [show, setShow] = useState(false);

  const hide = () => setShow(false);

  return (
    <Box sx={{ flexGrow: 1, color: 'white' }}>
      <Logo></Logo>
      <Stack
        spacing={4}
        direction="row"
        className="scrollable-content"
        style={{ paddingLeft: '1rem' }}
      >
        <Box style={style} onClick={() => setShow(!show)}>
          SCANNERS
        </Box>
      </Stack>
      {show && <Scanners style={style} hide={hide}></Scanners>}
      <Divider color={grey} style={{ marginTop: '1rem' }}></Divider>
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
          style={{ textDecoration: 'none', color: 'white' }}
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
    border: '2px dashed ' + grey,
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
