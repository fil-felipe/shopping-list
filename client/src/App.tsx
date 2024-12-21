import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import { createTheme, ThemeProvider  } from '@mui/material/styles';
import { Typography } from '@mui/material';

import './App.css';

import ShoppingLists from './pages/ShoppingLists';
import ShoppingItems from './pages/ShoppingItems';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        light: '#EEE9DA',
        main: '#93BFCF',
        dark: '#6096B4',
        contrastText: '#fff',
      },
      secondary: {
        light: '#9DC08B',
        main: '#609966',
        dark: '#40513B',
        contrastText: '#EDF1D6',
      },
    },
    typography: {
      fontFamily: [
        'Shadows+Into+Light',
        'cursive',
      ].join(','),
    }
  });

  return (
    <ThemeProvider theme={theme}>
    <Typography component="span">
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ShoppingLists />} />
          <Route path="/:listId" element={<ShoppingItems />} />
        </Routes>
      </Router>
      {/* </header> */}
    </div>
    </Typography>
    </ThemeProvider>
  );
}

export default App;
