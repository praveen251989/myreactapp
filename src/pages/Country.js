import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import "../App.css";
import { doc, getDocs, setDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import TextField from "@mui/material/TextField";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Country = (props) => {
	const [textData, setTextData] = useState("");
	const { targetE } = props;
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleTextChange = (event) => {
		setTextData(event.target.value);
	};

	const handleAdd = async () => {
		await setDoc(doc(db, "Country", `${textData}`), {
			name: `${textData}`,
		});
		fetchCountries();
		setTextData("");
	};
	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 150,
		},
		{
			field: "name",
			headerName: "Name",
			width: 150,
			editable: true,
		},
	];
	const fetchCountries = async () => {
		let countries = [];
		let index = 1;
		const queryCountries = await getDocs(collection(db, "Country"));
		queryCountries.forEach((doc) => {
			countries.push({ ...doc.data(), id: index });
			index++;
		});
		setData(countries);
		setLoading(false);
	};

	const handleCellEdit = (ur, or) => {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve("Async operation succeeded!");
			}, 200);
		});
		promise.then((resp) => {
			alert(resp);
		});
	};

	useEffect(() => {
		fetchCountries();
	}, []);

	return (
		<div>
			<Stack spacing={3}>
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
			<div style={{ width: "100%", marginTop: "260px" }}>
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
							console.log(params);
						}}
						//onProcessRowUpdateError={handleProcessRowUpdateError}
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

export default Country;
