import * as React from 'react';
import { Box, AppBar, Button, Toolbar } from '@mui/material';
import { chartink_strategy } from '../constants/ChartInkStrategy';
import { useState, useEffect } from 'react';

export default function Chartink() {
  const [src, changeSrc] = useState(chartink_strategy['5813ema']);

  useEffect(() => {
    console.log(src);
  }, [src]);

  const handleSrc = (name) => {
    changeSrc(chartink_strategy[name]);
  };

  return (
    <Box style={{ width: '100%', flexGrow: 1, height: '100vh' }}>
      <ChartinkStrategy function={handleSrc}></ChartinkStrategy>
      <iframe
        title="Iframe Example"
        src={src}
        style={{ border: 'none', width: '100%', height: '100%' }}
      />
    </Box>
  );
}

function ChartinkStrategy(props) {
  const rendered = [];
  Object.keys(chartink_strategy).forEach((key) => {
    rendered.push(
      <Button color="inherit" onClick={() => props.function(key)}>
        {key}
      </Button>
    );
  });
  return (
    <AppBar position="static" style={{ backgroundColor: 'black' }}>
      <Toolbar>{rendered}</Toolbar>
    </AppBar>
  );
}
