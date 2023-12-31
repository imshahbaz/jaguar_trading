import * as React from 'react';
import {
  Box,
  Grid,
  Divider,
  Button,
  Input,
  Paper,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import readXlsxFile from 'read-excel-file';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import AlertInfo from '../components/AlertInfo';
import '../css/HomePage.css';
import upload from '../images/upload.png';
import { handleData } from '../utils/FileUtils.js';
import StockDetailsTable from '../components/Table copy.jsx';
import { ColorCodes } from '../constants/ColorCodes.jsx';

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(null);
  const [rows, setRows] = useState([]);
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

  useEffect(() => {}, [rows, show, showAlert]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
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
          <AcceptFileForm
            fileName={fileName}
            onSubmit={onSubmit}
            triggerClick={triggerClick}
            handleFileChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider color={ColorCodes.element} />
        </Grid>
        <Grid item xs={10}>
          <StockDetailsTable show={show} rows={rows}></StockDetailsTable>
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

function AcceptFileForm(props) {
  return (
    <Paper
      sx={{
        paddingTop: '1rem',
        paddingBottom: '1rem',
        borderRadius: '2rem',
        backgroundColor: ColorCodes.element,
        marginTop: '1rem',
      }}
    >
      <Typography style={{ color: ColorCodes.text, fontWeight: 'bold' }}>
        Upload Excel File
      </Typography>
      <form onSubmit={(e) => props.onSubmit(e)}>
        <Box className="upload-input" onClick={props.triggerClick}>
          <img
            src={upload}
            alt="Upload Excel File"
            className="upload-input-image"
          />
        </Box>
        {props.fileName && (
          <section className="filename-section">
            <span className="filename-span">
              Selected File :- {props.fileName}
            </span>
          </section>
        )}
        <Input
          type="file"
          required={true}
          style={{ margin: '1rem', display: 'none' }}
          onChange={props.handleFileChange}
          inputProps={{ accept: '.xlsx' }}
          id="excel-file-input"
        />
        <Button
          variant="outlined"
          color="primary"
          style={{
            margin: '1rem',
            borderRadius: '1rem',
            width: '70%',
            color: ColorCodes.text,
            border: '2px solid ' + ColorCodes.border,
            fontWeight: 'bold',
          }}
          type="submit"
          size="large"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </form>
    </Paper>
  );
}
