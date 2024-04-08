import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import "../App.css";
import {
	doc,
	getDocs,
	setDoc,
	collection,
	query,
	where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const City = (props) => {
	const [textData, setTextData] = useState("");
	const { targetE } = props;
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [states, setStates] = useState([]);
	const [countries, setCountries] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleTextChange = (event) => {
		setTextData(event.target.value);
	};

	const handleCountryChange = (event) => {
		setCountry(event.target.value);
	};

	const handleStateChange = (event) => {
		setState(event.target.value);
	};

	/* const handleCityChange = (event) => {
		setCity(event.target.value);
	}; */

	const handleAdd = async () => {
		await setDoc(doc(db, "City", `${textData}`), {
			country: `${country}`,
			state: `${state}`,
			city: `${textData}`,
		});
		fetchCities();
		setTextData("");
	};

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
		const queryStates = await getDocs(
			query(collection(db, "State"), where("country", "==", country))
		);
		queryStates.forEach((doc) => {
			statesArr.push(doc.data().state);
		});
		setStates(statesArr);
	};

	const fetchCities = async () => {
		let tableDataArr = [];
		let index = 1;
		const queryAllCities = await getDocs(collection(db, "City"));
		queryAllCities.forEach((doc) => {
			tableDataArr.push({ ...doc.data(), id: index });
			index++;
		});
		setTableData(tableDataArr);
		setLoading(false);
	};

	useEffect(() => {
		fetchCountries();
		fetchStates();
		fetchCities();
	}, [country, state]);

	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 150,
		},
		{
			field: "country",
			headerName: "Country",
			width: 150,
			editable: true,
		},
		{
			field: "state",
			headerName: "State",
			width: 150,
			editable: true,
		},
		{
			field: "city",
			headerName: "City",
			width: 150,
			editable: true,
		},
	];

	return (
		<div>
			<Stack spacing={3}>
				<FormControl sx={{ width: 300 }}>
					<InputLabel>Country</InputLabel>
					<Select
						value={country}
						label="Country"
						onChange={handleCountryChange}
					>
						{countries.map((country) => (
							<MenuItem key={country} value={country}>
								{country}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl sx={{ width: 300 }}>
					<InputLabel>State</InputLabel>
					<Select
						value={state}
						label="State"
						onChange={handleStateChange}
					>
						{states.map((state) => (
							<MenuItem key={state} value={state}>
								{state}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					label={`Enter ${targetE}`}
					variant="outlined"
					value={textData}
					onChange={(e) => handleTextChange(e)}
					className="confWidth"
				/>
				<Button
					label="Add"
					variant="contained"
					onClick={handleAdd}
					className="confWidth"
				>
					Add
				</Button>
			</Stack>
			<br />
			<div style={{ width: "100%", marginTop: "120px" }}>
				{loading ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<CircularProgress />
					</Box>
				) : (
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
				)}
			</div>
		</div>
	);
};

export default City;
