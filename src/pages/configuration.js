// src/App.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Stack } from "@mui/material";
import '../App.css';
import Country from "./Country";
import State from "./State";
import City from './City';
import Location from './Location';
import Segment from './Segment';
import SegmentLocation from './SegmentLocation';

function Configuration() {
	const [showElement, setShowElement] = useState(false);
	const [target, setTarget] = useState('');

	const handleClick = (e) => {
		setShowElement(true);
		setTarget(e.id);
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
					<Button id="Location" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						Location
					</Button>
					<Button id="Segment" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						Segment
					</Button>
					<Button id="SegmentLocation" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						Segment Location
					</Button>
				</Stack>
			</Paper>
			<Paper elevation={3} style={{ width: '85%',marginLeft:'10px', padding: '10px', marginTop:'5px'}}>
				<div className="rightDivContent">
					{showElement && target === 'Country' && (
						<Country targetE={target} />
					)}
					{showElement && target === 'State' && (
						<State targetE={target} />
					)}
					{showElement && target === 'City' && (
						<City targetE={target} />
					)}
					{showElement && target === 'Location' && (
						<Location targetE={target} />
					)}
					{showElement && target === 'Segment' && (
						<Segment targetE={target} />
					)}
					{showElement && target === 'SegmentLocation' && (
						<SegmentLocation targetE={target} />
					)}
					{showElement && target === 'SegmentLocation' && (
						<SegmentLocation targetE={target} />
					)}
				</div>
			</Paper>
    </Box>
	);
}
export default Configuration;