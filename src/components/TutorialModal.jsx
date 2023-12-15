import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function TutorialModal(props) {
  return (
    <Dialog
      fullWidth={true}
      open={props.open}
      onClose={props.show}
      style={{ textAlign: 'center' }}
    >
      <DialogTitle>Tutorial</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>Follow the Steps</DialogContentText>

        <Divider />

        <List style={{ textAlign: 'center', justifyContent: 'center' }}>
          <ListItem>
            <ListItemText primary="1 Click on Scanners" />
          </ListItem>
          <Divider />
          <ListItem divider>
            <ListItemText primary="2 Select favorite strategy" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3 Click on Excel button to download file" />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary="4 Upload the file on the main page" />
          </ListItem>
        </List>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={props.show}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
