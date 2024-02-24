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

const Location = (props) => {
    const [textData, setTextData] = useState('');
    const {targetE} = props;
    const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [location, setLocation] = useState('');
	const [locations, setLocations] = useState([]);
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

    const handleAdd = async () => {
		await setDoc(doc(db, "Location", `${textData}`), 
			{
				country:`${country}`,
				state:`${state}`,
				city:`${city}`,
				location:`${textData}`
			}
		);
		fetchLocations();
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
		let tableDataArr = [];
		let index = 1;
		const queryLocations = await getDocs(query(collection(db, "Location"), where("city", "==", city)));
		queryLocations.forEach((doc) => {
			locationsArr.push(doc.data().location);
		});

		const queryAllLocations = await getDocs(collection(db, "Location"));
		queryAllLocations.forEach((doc) => {
			tableDataArr.push({ ...doc.data(), id: index });
			index++;
		});
		setLocations(locationsArr);
		setTableData(tableDataArr);
	};

	useEffect(() => {
		fetchCountries();
		fetchStates();
		fetchCities();
		fetchLocations();
	}, [country, state, city, location]);

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
		}
		,
		{
			field: 'location',
			headerName: 'Location',
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

export default Location;
