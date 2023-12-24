import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function StockDetailsTable(props) {
  const style = { color: 'white', backgroundColor: '#111111' };

  return (
    <>
      {props.show && (
        <Paper style={{ borderRadius: '2rem', border: '3px solid #1d1d1d' }}>
          <TableContainer
            component={Paper}
            style={{
              borderRadius: '2rem',
              backgroundColor: '#111111',
              border: '3px solid #1d1d1d',
            }}
          >
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={style}>
                    Name
                  </TableCell>
                  <TableCell align="center" style={style}>
                    Margin
                  </TableCell>
                  <TableCell align="center" style={style}>
                    {'Price(INR)'}
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
                      {row.margin}
                    </TableCell>
                    <TableCell align="center" style={style}>
                      {row.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
}
