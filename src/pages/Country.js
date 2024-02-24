import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";
import '../App.css';
import { doc, getDocs, setDoc, collection } from "firebase/firestore"; 
import {db} from "../config/firebase";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar, GridCellEditStopParams, MuiEvent } from '@mui/x-data-grid';

const Country = (props) => {
    const [textData, setTextData] = useState('');
    const {targetE} = props;
    const [country, setCountry] = useState('');
	const [data, setData] = useState([]);

    const handleTextChange = (event) => {
		setTextData(event.target.value);
    };

    const handleChange = (event) => {
		setCountry(event.target.value);
	};

    const handleAdd = async () => {
		await setDoc(doc(db, "Country", `${textData}`), 
			{
				name:`${textData}`
			}
		);
		fetchCountries();
		setTextData('');
	}
	const columns = [
		{
			field:'id',
			headerName: "ID",
			width: 150,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 150,
			editable: true,
		}
	];
	const fetchCountries = async () => {
		let countries = [];
		let index = 1;
		const queryCountries = await getDocs(collection(db, "Country"));
		queryCountries.forEach((doc) => {
			countries.push({ ...doc.data(), id: index });
			index++;
		});
		console.log(countries)
		setData(countries);
	};

	const handleCellEdit = (ur, or) => {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve("Async operation succeeded!");
			}, 200);
		});
		promise.then(resp =>{
			alert(resp);
		})
		console.log(ur, or);
	};

	const handleProcessRowUpdateError = (error) => {
		//console.log(error)
	}

	useEffect(() => {
		fetchCountries();
	}, []);

	return (
		<div>
			<Stack spacing={3}>
				<FormControl sx={{ m: 1, width: 300 }}>
					<InputLabel >
						Countries
					</InputLabel>
					<Select
						id="demo-simple-select-helper"
						value={country}
						label="Countries"
						onChange={handleChange}
					>
						{ data.map((country) => (
							<MenuItem key={country.name} value={country.name}>{country.name}</MenuItem>
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
					rows={data}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					disableRowSelectionOnClick
					disableColumnFilter
					disableColumnSelector
					disableDensitySelector
					onCellEditStop={(params, event) => {
						console.log(params)
					}}
					//onProcessRowUpdateError={handleProcessRowUpdateError}
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

export default Country;
