import './App.css';
import NavBar from './components/Navbar';
import FileForm from './pages/Fileform';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Box className="App" sx={{ flexGrow: 1 }}>
      <Stack spacing={2}>
        <NavBar></NavBar>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FileForm />}></Route>
          </Routes>
        </BrowserRouter>
      </Stack>
    </Box>
  );
}

export default App;
