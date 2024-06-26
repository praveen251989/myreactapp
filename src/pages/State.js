import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import "../App.css";
import { doc, getDocs, setDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const State = (props) => {
	const [textData, setTextData] = useState("");
	const { targetE } = props;
	const [country, setCountry] = useState("");
	const [countries, setCountries] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleTextChange = (event) => {
		setTextData(event.target.value);
	};

	const handleCountryChange = (event) => {
		setCountry(event.target.value);
	};

	/* 	const handleStateChange = (event) => {
		setState(event.target.value);
	}; */

	const handleAdd = async () => {
		await setDoc(doc(db, "State", `${textData}`), {
			country: `${country}`,
			state: `${textData}`,
		});
		fetchStates();
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
		let tableDataArr = [];
		let index = 1;
		const queryAllStates = await getDocs(collection(db, "State"));
		queryAllStates.forEach((doc) => {
			tableDataArr.push({ ...doc.data(), id: index });
			index++;
		});
		setTableData(tableDataArr);
		setLoading(false);
	};

	useEffect(() => {
		fetchCountries();
		fetchStates();
	}, [country]);

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
	];

	return (
		<div>
			<Stack spacing={3}>
				<FormControl sx={{ width: 300 }}>
					<InputLabel id="demo-simple-select-helper-label">
						Country
					</InputLabel>
					<Select
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
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
			<div style={{ width: "100%", marginTop: "200px" }}>
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
						//checkboxSelection
						disableRowSelectionOnClick
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

export default State;
