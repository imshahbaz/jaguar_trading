import * as React from 'react';
import { Box, Grid, Divider, Button, Input, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import readXlsxFile from 'read-excel-file';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import TutorialModal from '../components/TutorialModal';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AlertInfo from '../components/AlertInfo';
import '../css/HomePage.css';
import upload from '../images/upload.png';
import { handleData } from '../utils/FileUtils.js';
import StockDetailsTable from '../components/Table copy.jsx';

const grey = '#1d1d1d';

export default function HomePage() {
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
          <AcceptFileForm
            fileName={fileName}
            onSubmit={onSubmit}
            triggerClick={triggerClick}
            handleFileChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider color={grey} />
        </Grid>
        <Grid item xs={10}>
          <StockDetailsTable show={show} rows={rows}></StockDetailsTable>
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="outlined"
            color="primary"
            style={{
              margin: '1%',
              borderRadius: '1rem',
              width: '87.5%',
              color: 'white',
              border: '4px solid ' + grey,
            }}
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

function AcceptFileForm(props) {
  return (
    <Paper
      sx={{
        paddingTop: '1rem',
        paddingBottom: '1rem',
        borderRadius: '2rem',
        backgroundColor: '#111111',
        marginTop: '1rem',
        border: '4px solid ' + grey,
      }}
    >
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
            color: 'white',
            border: '4px solid ' + grey,
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
