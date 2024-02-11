// src/App.js
import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Stack } from "@mui/material";

function Configuration() {
	const handleClick = (e) => {
		alert(e.id);
	};
	return (
		<Box sx={{display:"flex"}}>
			<Paper elevation={3} style={{ width: '15%', height: '97vh', overflowY: 'auto',padding:'10px',marginLeft:'10px',marginTop:'5px' }}>
				<Stack spacing={1}>
					<Button id="Country" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						Country
					</Button>
					<Button id="State" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						State
					</Button>
					<Button id="City" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						City
					</Button>
				</Stack>
			</Paper>
			<Paper elevation={3} style={{ width: '85%',marginLeft:'10px', padding: '10px', marginTop:'5px'}}>
				<div id="contentDiv">

				</div>
			</Paper>
    </Box>
	);
}
export default Configuration;