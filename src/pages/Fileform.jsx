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
import TutorialModal from '../components/TutorialModal';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from '@mui/material/Divider';
import AlertInfo from '../components/AlertInfo';

export default function FileForm() {
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(null);
  const [rows, setRows] = useState([]);
  const [tutorialModalShow, setTutorialModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    readXlsxFile(file).then((data) => {
      const response = handleData(data);
      if (response.length > 0) {
        setRows(handleData(data));
        setShow(true);
      } else {
        setShow(false);
        setShowAlert(true);
      }
    });
  };

  const handleData = (data) => {
    const priceData = [];
    const priceNames = [];
    for (let i = 0; i < data.length; i++) {
      if (i === 0 || i === 1) continue;
      const name = data[i][2];
      priceData.push({ name: name, price: data[i][5] });
      priceNames.push(name);
    }

    const marginData = mtf.map((stock) => {
      return stock.symbol;
    });

    const commonData = priceNames.filter((name) => marginData.includes(name));

    const response = commonData.map((name) => {
      const margin = mtf.find((stock) => stock.symbol === name);
      const price = priceData.find((stock) => stock.name === name);
      return { name: name, margin: margin.percent, price: price['price'] };
    });

    return response.sort((a, b) => {
      return b.margin - a.margin;
    });
  };

  useEffect(() => {}, [rows, show, showAlert]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleTutorialShow = () => {
    setTutorialModalShow(!tutorialModalShow);
  };

  const handleShowAlert = () => {
    setShowAlert(false);
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
              style={{ margin: '1%', backgroundColor: '#112A24' }}
              type="submit"
              size="large"
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={10}>
          <StockDetailsTable show={show} rows={rows}></StockDetailsTable>
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '1%', backgroundColor: '#112A24' }}
            size="large"
            onClick={handleTutorialShow}
            startIcon={<AssignmentIcon />}
          >
            Tutorial
          </Button>
          <TutorialModal
            show={handleTutorialShow}
            open={tutorialModalShow}
          ></TutorialModal>
        </Grid>
        <Grid item xs={12}>
          <AlertInfo
            open={showAlert}
            message="No stocks found for this strategy choose different strategy"
            handleClose={handleShowAlert}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
