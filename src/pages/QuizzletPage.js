import React from "react";
import { useState} from "react";
import Box from "@mui/material/Box";
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

const QuizzletPage = () => {
    const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const rowsData = [
		{id:1, state:'Telangana', city: 'Hyderabad', location:'Nizampet', segment:'someeSegment',month:'July',week: 'Thursday', category: 'Test', userStatus:'testt', quizzletStatus:'Test'}
	];
	const openSegmentPopup = () => {
		setOpen(true);
	}
	const handleClose = () => {
		setOpen(false);
	}
	const userColumns = [
		{field: "state", headerName: "State", width:150},
		{field: "city", headerName: "City", width:150},
		{field: "location", headerName: "Location", width:150},
		{field: "segment", headerName: "Segment", width:150},
		{field: "month", headerName: "Month", width:150},
		{field: "week", headerName: "Week", width:150},
		{field: "category", headerName: "Category", width:150},
		{field: "userStatus", headerName: "User Status", width:150},
		{field: "quizzletStatus", headerName: "Quizzlet Status", width:150},
	];
	const cqColumns = [
		{
			field: "segmentId", 
			headerName: "Segment ID", 
			width:150, 
			renderCell: (params) => {
				return(
					<Link
					underline="hover"
					component="button"
					variant="body2"	
					onClick={() =>
						openSegmentPopup()
					}			
					>{params.row.segmentId}</Link>
				);
			}
		},
		{field: "quizzno", headerName: "Quiz No", width:150},
		{field: "ur", headerName: "UR", width:150},
		{field: "reg", headerName: "Reg", width:150},
		{field: "inProg", headerName: "InProg", width:150},
		{field: "completed", headerName: "completed", width:150},
		{field: "publishedDt", headerName: "Published Dt", width:150},
		{field: "quizzletStatus", headerName: "Quizzlet Status", width:150},
		{field: "noofinst", headerName: "No of Installations", width:150},
	];
	const cqData = [
		{id:1, segmentId:100, quizzno:5, ur:'test', reg:'test', inProg:'test', completed:'true', publishedDt:'10-03-2019', quizzletStatus:'completed', noofinst:'15'}
	];
	return (
		<div style={{marginTop:50}}>
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
				<>
				<DataGrid
					disableRowSelectionOnClick
					rows={rowsData}
					columns={userColumns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					pageSizeOptions={[5, 10, 20, 50, 100]}
				/>
				<DataGrid
					sx={{marginTop:10}}
					disableRowSelectionOnClick
					rows={cqData}
					columns={cqColumns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					pageSizeOptions={[5, 10, 20, 50, 100]}
				/>
				<Dialog onClose={handleClose} open={open}>
					<div style={{padding:30}}>
						<Typography variant="body1" component="div">
							Location<t/>: Test
						</Typography><br/>
						<Typography variant="body1" component="div">
							Name: Test
						</Typography><br/>
						<Typography variant="body1" component="div">
							Contact: Test
						</Typography><br/>
						<Typography variant="body1" component="div">
							Email: Test
						</Typography>
					</div>
				</Dialog>
				</>
			)}
		</div>
	);
};

export default QuizzletPage;
