import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import pic from '../static/logo.png';

export default function TitleBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<img
						alt="logo"
						src={pic}
						
					/>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Speed Test
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
