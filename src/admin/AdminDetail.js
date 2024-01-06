import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import '../App.css';

const AdminDetail = () => {
	const [value, setValue] = React.useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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
						<Tab sx={{ fontWeight:'bold'}} label="FND" value="5" />
						<Tab sx={{ fontWeight:'bold'}} label="Ad Configuration" value="6" />
						<Tab sx={{ fontWeight:'bold'}} label="BO Concern" value="7" />
					</TabList>
				</Box>
				<TabPanel value="1">Item One</TabPanel>
				<TabPanel value="2">Item Two</TabPanel>
				<TabPanel value="3">Item Three</TabPanel>
				<TabPanel value="4">Item Four</TabPanel>
				<TabPanel value="5">Item Five</TabPanel>
				<TabPanel value="6">Item Six</TabPanel>
				<TabPanel value="7">Item Seven</TabPanel>
			</TabContext>
		</Box>
	);
};

export default AdminDetail;
