import * as React from 'react';
import { Box, Grid, Divider, Button, Input, Paper } from '@mui/material';
import StockDetailsTable from '../components/Table';
import { useState, useEffect } from 'react';
import readXlsxFile from 'read-excel-file';
import { mtf } from '../constants/MStock';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import TutorialModal from '../components/TutorialModal';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AlertInfo from '../components/AlertInfo';
import '../css/Form.css';
import upload from '../images/upload.png';

export default function FileForm() {
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(null);
  const [rows, setRows] = useState([]);
  const [tutorialModalShow, setTutorialModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fileName, setFileName] = useState(null);

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
      setFileName(e.target.files[0].name);
    }
  };

  const handleTutorialShow = () => {
    setTutorialModalShow(!tutorialModalShow);
  };

  const handleShowAlert = () => {
    setShowAlert(false);
  };

  const triggerClick = () => {
    document.querySelector('#excel-file-input').click();
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
          <Paper
            elevation={16}
            sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}
          >
            <form onSubmit={(e) => onSubmit(e)}>
              <Box className="upload-input" onClick={triggerClick}>
                <img
                  src={upload}
                  alt="Upload Excel File"
                  className="upload-input-image"
                />
              </Box>
              {fileName && (
                <section className="filename-section">
                  <span className="filename-span">
                    Selected File :- {fileName}
                  </span>
                </section>
              )}
              <Input
                type="file"
                required={true}
                style={{ margin: '1rem', display: 'none' }}
                onChange={handleFileChange}
                inputProps={{ accept: '.xlsx' }}
                id="excel-file-input"
              />
              <Button
                variant="contained"
                color="primary"
                style={{ margin: '1rem', backgroundColor: '#112A24' }}
                type="submit"
                size="large"
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={16}>
            <StockDetailsTable show={show} rows={rows}></StockDetailsTable>
          </Paper>
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
