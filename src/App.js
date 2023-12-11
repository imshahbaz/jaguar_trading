import './App.css';
import NavBar from './components/Navbar';
import FileForm from './components/Fileform';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <Box className="App" sx={{ flexGrow: 1 }}>
      <Stack spacing={2}>
        <NavBar></NavBar>
        <FileForm></FileForm>
      </Stack>
    </Box>
  );
}

export default App;
