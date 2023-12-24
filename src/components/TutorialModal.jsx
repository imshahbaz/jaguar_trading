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
import { ColorCodes } from '../constants/ColorCodes.jsx';

export default function TutorialModal(props) {
  const style = { backgroundColor: ColorCodes.element, color: ColorCodes.text };
  return (
    <Dialog
      fullWidth={true}
      open={props.open}
      onClose={props.show}
      style={{
        textAlign: 'center',
        ...style,
      }}
    >
      <DialogTitle style={style}>Tutorial</DialogTitle>
      <DialogContent style={style}>
        <DialogContentText
          style={{
            marginTop: '1rem',
            ...style,
          }}
        >
          Follow the Steps
        </DialogContentText>

        <List
          style={{
            textAlign: 'center',
            justifyContent: 'center',
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
      <DialogActions style={style}>
        <Button
          variant="outlined"
          onClick={props.show}
          style={{
            color: ColorCodes.text,
            border: '2px solid ' + ColorCodes.border,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
