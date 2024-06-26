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

const ConfigElement = (props) => {
	const [textData, setTextData] = useState("");
	const { targetE } = props;
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleTextChange = (event) => {
		setTextData(event.target.value);
	};

	const handleAdd = async () => {
		await setDoc(doc(db, targetE, `${textData}`), {
			value: `${textData}`,
		});
		fetchData();
		setTextData("");
	};
	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 150,
		},
		{
			field: "value",
			headerName: "Value",
			width: 150,
			editable: true,
		},
	];
	const fetchData = async () => {
		let tData = [];
		let index = 1;
		const queryCountries = await getDocs(collection(db, targetE));
		queryCountries.forEach((doc) => {
			tData.push({ ...doc.data(), id: index });
			index++;
		});
		setData(tData);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
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
			<div style={{ width: "100%", marginTop: "280px" }}>
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

export default ConfigElement;
