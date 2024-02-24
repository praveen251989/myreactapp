import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";
import '../App.css';
import { doc, getDocs, setDoc, collection, query, where } from "firebase/firestore"; 
import {db} from "../config/firebase";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const Segment = (props) => {
    const [textData, setTextData] = useState('');
    const {targetE} = props;
    const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [location, setLocation] = useState('');
	const [locations, setLocations] = useState([]);
	const [segment, setSegment] = useState('');
	const [segments, setSegments] = useState([]);
	const [cities, setCities] = useState([]);
	const [states, setStates] = useState([]);
	const [countries, setCountries] = useState([]);
	const [tableData, setTableData] = useState([]);

    const handleTextChange = (event) => {
		setTextData(event.target.value);
    };

    const handleCountryChange = (event) => {
		setCountry(event.target.value);
	};

	const handleStateChange = (event) => {
		setState(event.target.value);
	};

	const handleCityChange = (event) => {
		setCity(event.target.value);
	};

	const handleLocationChange = (event) => {
		setLocation(event.target.value);
	};

	const handleSegmentChange = (event) => {
		setSegment(event.target.value);
	};

    const handleAdd = async () => {
		await setDoc(doc(db, "Segment", `${textData}`), 
			{
				country:`${country}`,
				state:`${state}`,
				city:`${city}`,
				location: `${location}`,
				segment: `${textData}`
			}
		);
		fetchSegments();
		setTextData('');
	}
	
	const fetchCountries = async () => {
		let countriesArr = [];
		const queryCountries = await getDocs(collection(db, "Country"));
		queryCountries.forEach((doc) => {
			countriesArr.push(doc.data().name);			
		});
		setCountries(countriesArr);
	};

	const fetchStates = async () => {
		let statesArr = [];
		const queryStates = await getDocs(query(collection(db, "State"), where("country", "==", country)));
		queryStates.forEach((doc) => {
			statesArr.push(doc.data().state);
		});
		setStates(statesArr);
	};

	const fetchCities = async () => {
		let citiesArr = [];
		const queryCities = await getDocs(query(collection(db, "City"), where("state", "==", state)));
		queryCities.forEach((doc) => {
			citiesArr.push(doc.data().city);
		});
		setCities(citiesArr);
	};

	const fetchLocations = async () => {
		let locationsArr = [];
		const queryLocations = await getDocs(query(collection(db, "Location"), where("city", "==", city)));
		queryLocations.forEach((doc) => {
			locationsArr.push(doc.data().location);
		});
		setLocations(locationsArr);
	};

	const fetchSegments = async () => {
		let segmentsArr = [];
		let tableDataArr = [];
		const querySegments = await getDocs(query(collection(db, "Segment"), where("location", "==", location)));
		querySegments.forEach((doc) => {
			segmentsArr.push(doc.data().segment);
		});

		let index = 1;
		const queryAllSegments = await getDocs(collection(db, "Segment"));
		queryAllSegments.forEach((doc) => {
			tableDataArr.push({ ...doc.data(), id: index });
			index++;
		});
		setSegments(segmentsArr);
		setTableData(tableDataArr);
	};

	useEffect(() => {
		fetchCountries();
		fetchStates();
		fetchCities();
		fetchLocations();
		fetchSegments();
	}, [country, state, city, location, segment]);

	const columns = [
		{
			field:'id',
			headerName: "ID",
			width: 150,
		},
		{
			field: 'country',
			headerName: 'Country',
			width: 150,
			editable: true,
		},
		{
			field: 'state',
			headerName: 'State',
			width: 150,
			editable: true,
		},
		{
			field: 'city',
			headerName: 'City',
			width: 150,
			editable: true,
		},
		{
			field: 'location',
			headerName: 'Location',
			width: 150,
			editable: true,
		},
		{
			field: 'segment',
			headerName: 'Segment',
			width: 150,
			editable: true,
		}
	];

	return (
		<div>
			<Stack spacing={3}>
				<FormControl sx={{ width: 300 }}>
					<InputLabel >
						Country
					</InputLabel>
					<Select
						value={country}
						label="Country"
						onChange={handleCountryChange}
					>
						{ countries.map((country) => (
							<MenuItem key={country} value={country}>{country}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl sx={{ width: 300 }}>
					<InputLabel >
						State
					</InputLabel>
					<Select
						value={state}
						label="State"
						onChange={handleStateChange}
					>
						{ states.map((state) => (
							<MenuItem key={state} value={state}>{state}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl sx={{ width: 300 }}>
					<InputLabel >
						City
					</InputLabel>
					<Select
						value={city}
						label="City"
						onChange={handleCityChange}
					>
						{ cities.map((city) => (
							<MenuItem key={city} value={city}>{city}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl sx={{ width: 300 }}>
					<InputLabel >
						Location
					</InputLabel>
					<Select
						value={location}
						label="Location"
						onChange={handleLocationChange}
					>
						{ locations.map((location) => (
							<MenuItem key={location} value={location}>{location}</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					label={`Enter ${targetE}`}
					variant="outlined"
					value={textData}
					onChange={(e) => handleTextChange(e)}
				/>
				<Button label="Add" variant="contained" onClick={handleAdd}>
					Add
				</Button>
			</Stack>
			<br />
			<div
				style={{
					position: "absolute",
					bottom: 10,
					width: "82%",
					left: "17%",
				}}
			>
				<DataGrid
					disableRowSelectionOnClick
					rows={tableData}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					disableColumnFilter
					disableColumnSelector
					disableDensitySelector
					slots={{ toolbar: GridToolbar }}
					slotProps={{
						toolbar: {
							showQuickFilter: true,
						},
					}}
				/>
			</div>
		</div>
	);
};

export default Segment;