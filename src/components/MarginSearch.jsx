import * as React from 'react';

import { Box, Grid, Paper, TextField } from '@mui/material';
import { ColorCodes } from '../constants/ColorCodes';
import { useState } from 'react';
import { searchMargin } from '../utils/FileUtils';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function MarginSearch(props) {
  const [result, setResult] = useState({
    query: '',
    list: [],
  });

  const handleChange = (e) => {
    const result = searchMargin(e.target.value);
    console.log(result);
    setResult({
      query: e.target.value,
      list: result,
    });
  };

  const style = {
    marginTop: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    borderRadius: '2rem',
    backgroundColor: ColorCodes.element,
    cursor: 'default',
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10}>
          <Paper elevation={16} sx={{ ...style }}>
            <TextField
              id="outlined-search"
              placeholder="Search"
              type="search"
              style={{
                width: '80%',
                color: ColorCodes.text,
              }}
              inputProps={{
                sx: {
                  '&::placeholder': {
                    color: ColorCodes.text,
                    opacity: 1, // otherwise firefox shows a lighter color
                  },
                  color: ColorCodes.text,
                },
              }}
              value={result.query}
              onChange={handleChange}
            />
          </Paper>
          {result.list.length > 0 && (
            <PopulateSearch rows={result.list}></PopulateSearch>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

const PopulateSearch = (props) => {
  const style = { color: ColorCodes.text, backgroundColor: ColorCodes.element };
  return (
    <Paper
      style={{
        borderRadius: '2rem',
        marginTop: '1rem',
      }}
    >
      <TableContainer
        component={Paper}
        style={{
          borderRadius: '2rem',
          backgroundColor: ColorCodes.main,
        }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={style}>
                Name
              </TableCell>
              <TableCell align="center" style={style}>
                Symbol
              </TableCell>
              <TableCell align="center" style={style}>
                Margin
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={style}
                >
                  {row.name}
                </TableCell>
                <TableCell align="center" style={style}>
                  {row.symbol}
                </TableCell>
                <TableCell align="center" style={style}>
                  {row.percent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
