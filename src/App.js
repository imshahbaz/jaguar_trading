import './App.css';
import NavBar from './components/Navbar';
import FileForm from './pages/Fileform';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chartink from './pages/Chartink';

function App() {
  return (
    <Box className="App" sx={{ flexGrow: 1 }}>
      <Stack spacing={2}>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<FileForm />}></Route>
            <Route path="/scanners" element={<Chartink />}></Route>
          </Routes>
        </BrowserRouter>
      </Stack>
    </Box>
  );
}

export default App;
