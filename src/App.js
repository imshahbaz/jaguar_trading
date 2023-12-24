import './App.css';
import HomePage from './pages/HomePage';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CarousalBar from './components/CarousalBar';

function App() {
  return (
    <Box className="App" sx={{ flexGrow: 1 }}>
      <Stack spacing={2}>
        <BrowserRouter>
          <CarousalBar></CarousalBar>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </BrowserRouter>
      </Stack>
    </Box>
  );
}

export default App;
