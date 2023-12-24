import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const grey = '#1d1d1d';

export default function TutorialModal(props) {
  return (
    <Dialog
      fullWidth={true}
      open={props.open}
      onClose={props.show}
      style={{
        textAlign: 'center',
        backgroundColor: '#111111',
        color: 'white',
      }}
    >
      <DialogTitle style={{ backgroundColor: '#111111', color: 'white' }}>
        Tutorial
      </DialogTitle>
      <DialogContent style={{ backgroundColor: '#111111', color: 'white' }}>
        <DialogContentText
          style={{
            backgroundColor: '#111111',
            color: 'white',
            marginTop: '1rem',
          }}
        >
          Follow the Steps
        </DialogContentText>

        <List
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: '#111111',
            color: 'white',
          }}
        >
          <ListItem>
            <ListItemText primary="1 Click on Scanners" />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="2 Select favorite strategy" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3 Click on Excel button to download file" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4 Upload the file on the main page" />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions style={{ backgroundColor: '#111111', color: 'white' }}>
        <Button
          variant="outlined"
          onClick={props.show}
          style={{ color: 'white', border: '2px solid ' + grey }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
