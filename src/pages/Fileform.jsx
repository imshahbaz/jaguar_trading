import * as React from 'react';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import StockDetailsTable from '../components/Table';
import { useState } from 'react';
import { useEffect } from 'react';
import readXlsxFile from 'read-excel-file';
import { mtf } from '../constants/MStock';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

export default function FileForm() {
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(null);
  const [rows, setRows] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(file);
    console.log('upload');
    readXlsxFile(file).then((data) => {
      setRows(handleData(data));
    });
    setShow(true);
  };

  const handleData = (data) => {
    let list = [];
    let response = [];
    for (let i = 0; i < data.length; i++) {
      if (i === 0 || i === 1) continue;
      const name = data[i][2];
      list.push(name);
    }

    const set = new Set(list);
    mtf.forEach((stock) => {
      if (set.has(stock.symbol))
        response.push({ name: stock.symbol, margin: stock.percent });
    });

    console.log(response);
    return response.sort((a, b) => {
      return b.margin - a.margin;
    });
  };

  useEffect(() => {}, [rows, show]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
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
        <Grid item xs={8}>
          <form onSubmit={(e) => onSubmit(e)}>
            <Input
              type="file"
              required={true}
              style={{ margin: '1%' }}
              onChange={handleFileChange}
            />
            <br></br>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '1%', backgroundColor: 'black' }}
              type="submit"
              size="large"
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </form>
        </Grid>
        <Grid item xs={10}>
          <StockDetailsTable show={show} rows={rows}></StockDetailsTable>
        </Grid>
      </Grid>
    </Box>
  );
}
