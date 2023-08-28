import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Details from './pages/Details';
import Go from './components/Go';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
const theme = createTheme({
	palette: {
		primary: { main: '#342e39', contrastText: '#fd5f07' },
		secondary: { main: '#FFFFFFF' },
		background: {
			default: '#2f2834',
      		paper: '#342e39',
		},
		text:{
			primary:'#fd5f07'
		}
	}
});
function App() {
	// let navigate = useNavigate();
	return (
		<div className="App">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path="/" element={<Go />} />
						<Route path="/details" element={<Details />} />
					</Routes>
				
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
