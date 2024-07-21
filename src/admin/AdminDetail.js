import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import '../App.css';
import { PieChart } from '@mui/x-charts/PieChart';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Portal } from '@mui/base/Portal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { FormControl, FormLabel } from "@mui/material";

function MyCustomToolbar(props) {
	return (
	<React.Fragment>
		<Portal container={() => document.getElementById('filter-panel')}>
			<GridToolbarQuickFilter />
		</Portal>
	</React.Fragment>
	);
}


const AdminDetail = () => {
	const [value, setValue] = React.useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const ageData = [
		{ id: 0, value: 10, label: '1-18' },
		{ id: 1, value: 15, label: '18-30' },
		{ id: 2, value: 20, label: '30-60' },
		{ id: 3, value: 15, label: '60+' },
	];

	const genderData = [
		{ id: 0, value: 40, label: 'Male' },
		{ id: 1, value: 30, label: 'Female' },
		{ id: 2, value: 20, label: 'Others' },
	];

	let TOTAL = ageData.map((item) => item.value).reduce((a, b) => a + b, 0);
	const [data, setData] = React.useState(ageData);
	const getArcLabel = (params) => {
		const percent = params.value / TOTAL;
		return `${(percent * 100).toFixed(0)}%`;
	};

	const changePie = (type) => {
		switch(type) {
			case 'gender': TOTAL = genderData.map((item) => item.value).reduce((a, b) => a + b, 0);
							setData(genderData);break;
			case 'demography': setData([]);break;
			case 'employee': setData([]);break;
			default: TOTAL = ageData.map((item) => item.value).reduce((a, b) => a + b, 0);
					setData(ageData);
		}
	}
	const userColumns = [
		{field: "bid", headerName: "BID", width: 200},
		{field: "stDt", headerName: "Start Date", width: 200},
		{field: "endDt", headerName: "End Date", width: 200},
		{field: "amtPaid", headerName: "Amount Paid", width: 200},
		{field: "arAmt", headerName: "Available Amount", width: 200},
		{field: "consAmt", headerName: "Consumed Amount", width: 200},
		{field: "impressions", headerName: "Impressions", width: 200},
	];

	const rows = [
		{ id:1, bid: 1, stDt: new Date("2015-03-25").toLocaleDateString(), endDt: new Date("2016-03-25").toLocaleDateString(), amtPaid: 14, arAmt:123, consAmt:465, impressions:'' },
		{ id:2, bid: 2, stDt: new Date("2018-02-2").toLocaleDateString(), endDt: new Date("2019-02-2").toLocaleDateString(), amtPaid: 14, arAmt:123, consAmt:465, impressions:'' },
		{ id:3, bid: 3, stDt: new Date("2019-08-15").toLocaleDateString(), endDt: new Date("2020-08-15").toLocaleDateString(), amtPaid: 14, arAmt:123, consAmt:465, impressions:'' },
		{ id:4, bid: 4123, stDt: new Date("2011-01-5").toLocaleDateString(), endDt: new Date("2012-01-5").toLocaleDateString(), amtPaid: 14, arAmt:123, consAmt:465, impressions:'' },
	];


	return (
		<Box sx={{ width: "100%", typography: "body1" }}>
			<TabContext value={value}>
				<Box sx={{ fontWeight:'bold',borderBottom: 1, borderColor: "divider" }}>
					<TabList
						onChange={handleChange}
						aria-label="lab API tabs example"
					>
						<Tab sx={{ fontWeight:'bold'}} label="Registration" value="1" />
						<Tab sx={{ fontWeight:'bold'}} label="Quizzlet" value="2" />
						<Tab sx={{ fontWeight:'bold'}} label="Reports" value="3" />
						<Tab sx={{ fontWeight:'bold'}} label="Analytics" value="4" />
						<Tab sx={{ fontWeight:'bold'}} label="FIND" value="5" />
						<Tab sx={{ fontWeight:'bold'}} label="Ad Configuration" value="6" />
						<Tab sx={{ fontWeight:'bold'}} label="BO Concern" value="7" />
					</TabList>
				</Box>
				<TabPanel value="1">Item One</TabPanel>
				<TabPanel value="2">Item Two</TabPanel>
				<TabPanel value="3">Item Three</TabPanel>
				<TabPanel value="4">
					<div className="flexDisplay-gp-5 analytics-border marginTop">
						<div>
							<div className="analyticsTypes borderBottom borderRight">
								<Button variant="text" onClick={()=>changePie('age')}>Age</Button>
							</div>
							<div className="analyticsTypes borderBottom borderRight">
								<Button variant="text" onClick={()=>changePie('gender')}>Gender</Button>
							</div>
							<div className="analyticsTypes borderBottom borderRight">
								<Button variant="text" onClick={()=>changePie('demography')}>Demography</Button>
							</div>
							<div className="analyticsTypes borderRight">
								<Button variant="text" onClick={()=>changePie('employee')}>Employee</Button>
							</div>
						</div>
						<div>
							<PieChart
								series={[
									{	
										arcLabel: getArcLabel,
										data: [...data],
									},
								]}
								width={600}
								height={290}
							/>
						</div>
					</div>
				</TabPanel>
				<TabPanel value="5">
					<div className="marginTop">
						<Box id="filter-panel" sx={{marginBottom:'20px'}}/>
						<DataGrid
							disableRowSelectionOnClick 
							rows={rows}
							columns={userColumns}
							slots={{
								toolbar: MyCustomToolbar,
							}}
							initialState={{
								pagination: {
									paginationModel: {
									pageSize: 10,
									},
								},
							}}
							pageSizeOptions={[5,10,20,50,100]}
						/>
					</div>
				</TabPanel>
				<TabPanel value="6">
					<div>
						<FormControl component="fieldset" variant="standard">
							<FormLabel component="legend">Type of Ads</FormLabel>
							<FormGroup>
								<FormControlLabel
									value="banner"
									control={<Switch color="primary" />}
									label="Banner"
									labelPlacement="start"
								/>
								<FormControlLabel
									value="text"
									control={<Switch color="primary" />}
									label="Text"
									labelPlacement="start"
								/>
							</FormGroup>
						</FormControl>
					</div>
				</TabPanel>
				<TabPanel value="7">Item Seven</TabPanel>
			</TabContext>
		</Box>
	);
};

export default AdminDetail;
