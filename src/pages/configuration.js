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
import Events from './Events';
import ConfigElement from './ConfigElement';

function Configuration() {
	const [showElement, setShowElement] = useState(false);
	const [target, setTarget] = useState('');

	const handleClick = (e) => {
		setShowElement(true);
		setTarget(e.id);
	};

	function GetElement() {
		switch(target) {
			case 'Country': return <Country targetE={target}/>; 
			case 'State': return <State targetE={target} />;
			case 'City': return <City targetE={target} />;
			case 'Location': return <Location targetE={target} />;
			case 'Segment': return <Segment targetE={target} />;
			case 'SegmentLocation': return <SegmentLocation targetE={target} />;
			case 'Events': return <Events targetE={target} />;
			default: return <ConfigElement targetE={target} />;
		}
	}
	
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
					<Button id="Events" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						Events
					</Button>
					<Button id="ComplexityLevel" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						Complexity Level
					</Button>
					<Button id="UserStatus" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						User Status
					</Button>
					<Button id="QuizletStatus" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						Quizlet Status
					</Button>
					<Button id="Gender" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Gender
					</Button>
					<Button id="AdTypes" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						Ad Types
					</Button>
					<Button id="Months" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
						Months
					</Button>
					<Button id="BusinessConcernTypes" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Business Concern Types
					</Button>
					<Button id="Category" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Category
					</Button>
					<Button id="MaritalStatus" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Marital Status
					</Button>
					<Button id="Employment" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Employment
					</Button>
					<Button id="EmploymentStatus" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Employment Status
					</Button>
					<Button id="AdFrequency" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Ad Frequency
					</Button>
					<Button id="ChartType" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Chart Type
					</Button>
					<Button id="ExpenditureType" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Expenditure Type
					</Button>
					<Button id="AgeRange" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Age Range
					</Button>
					<Button id="Permissions" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Permissions
					</Button>
					<Button id="Roles" variant="outlined" color="primary" fullWidth onClick={(e)=> handleClick(e.target)}>
					Roles
					</Button>
				</Stack>
			</Paper>
			<Paper elevation={3} style={{ width: '85%',marginLeft:'10px', padding: '10px', marginTop:'5px'}}>
				<div className="rightDivContent">
					{showElement && (
						<GetElement/>
					)}					
				</div>
			</Paper>
    </Box>
	);
}
export default Configuration;