import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AdminTable from "../datatable/AdminTable";
import TextField from "@mui/material/TextField";
import {
	FormControl,
	Stack,
	RadioGroup,
	FormControlLabel,
	Radio,
	Typography,
} from "@mui/material";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Contact from "../pages/Contact";
import AdminDetail from "./AdminDetail";

const AdminList = () => {
	const initialState = {
		title: "",
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address1: "",
		address2: "",
		license: "",
		gst: "",
		cst: "",
		experience: "",
		description: "",
		noc: "",
		idProof: "",
		howDidYouKnow: "",
		bankActDetails: "",
		approved: "N",
		id: 0,
	};
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("no");
	const [state, setState] = useState(initialState);
	const [data, setData] = useState([]);
	const [noc, setNoc] = useState("");
	const [idPr, setIdPr] = useState("");
	const [nocFileName, setNocFileName] = useState("");
	const [idPrFileName, setIdPrFileName] = useState("");
	const nocRef = useRef();
	const idPrRef = useRef();
	const [loading, setLoading] = useState(true);
	const [selectedTab, setSelectedTab] = useState("1");
	const [tabs, setTabs] = useState([]);
	const [panels, setPanels] = useState([]);

	const handleUpload = (e) => {
		const file = e.target.files[0];
		if (e.target.name === "noc") {
			setNoc(file);
			setNocFileName(file.name);
		} else {
			setIdPr(file);
			setIdPrFileName(file.name);
		}
		const storageRef = ref(storage, "files/" + file.name);
		uploadBytes(storageRef, file).then((snapshot) => {
			console.log("Uploaded a blob or file!");
			getDownloadURL(snapshot.ref).then((downloadURL) => {
				if (e.target.name === "noc") {
					setState((prevState) => ({
						...prevState,
						noc: downloadURL,
					}));
				} else {
					setState((prevState) => ({
						...prevState,
						idProof: downloadURL,
					}));
				}
			});
		});
	};

	const handleClick = (ref) => {
		ref.current.click();
	};

	const handleRadioChange = (event) => {
		setValue(event.target.value);
	};

	const handleChange = (e) => {
		setState((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			saveDoc();
			handleClose();
			fetchAdminUsers();
		} catch (e) {
			alert("Something went wrong");
		}
	};

	const fetchAdminUsers = async () => {
		let adminUsers = [];
		let index = 1;
		const queryAdminUsers = await getDocs(collection(db, "admin-users"));
		queryAdminUsers.forEach((doc) => {
			adminUsers.push({ ...doc.data(), id: index });
			index++;
		});
		setData(adminUsers);
		setLoading(false);
	};

	useEffect(() => {
		fetchAdminUsers();
	}, []);

	const saveDoc = async () => {
		await setDoc(
			doc(db, "admin-users", `${state.firstName} ${state.lastName}`),
			state
		);
	};
	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	const chooseElement = (contentType, name) => {
		if(contentType === 'contact') {
			return (<div><Contact name={name}/></div>);
		}
		if (contentType === 'adminDetail') {
			return <div><AdminDetail/></div>
		}
	}

	const createNewTab = (contentType, newValue) => {
		if(tabs.length < 9) {
			if (tabs.length === 0 || tabs.every(tab => tab.value !== newValue)) {
				const name = newValue.split("_")[0];
				const newTab = {
					label: name,
					value: newValue,
				};
				setTabs([...tabs, newTab]);
				setPanels([...panels, 
					{
						value: newValue,
						child: () => chooseElement(contentType, name)
					}
				])
			}
			setSelectedTab(newValue);
		}
	};
	const closeTab = (event, tabValue) => {
		const tabsArr = tabs.filter((tab) => tab.value !== tabValue);
		setTabs(tabsArr);
		setSelectedTab("1");
		event.stopPropagation();
	};

	return (
		<div>
			<TabContext value={selectedTab}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList 
						onChange={handleTabChange} 
						sx={{
							"& button": {width:'150px',height:'50px',minHeight:'',textTransform:'none', fontWeight: 'bold', border: '1px solid grey', borderBottom: 'none', marginRight: '2px'}
						}}
					>
						<Tab
							label={<Typography noWrap={true} variant="body2" sx={{fontWeight:'bold'}}>Admin List</Typography> }
							value="1"
							sx={{ textTransform: "none" }}
						/>
						{tabs.map((tab) => (
							<Tab
								key={tab.value}
								label={<Typography noWrap={true} variant="body2" sx={{fontWeight:'bold'}}>{tab.label}</Typography> }
								value={tab.value}
								sx={{ display:'flex',justifyContent:'space-between',padding:'10px' }}
								{...(tab.value === selectedTab && {icon:<CloseRoundedIcon onClick={(e) => closeTab(e, tab.value)} fontSize='' sx={{ '&:hover':{color:'white',backgroundColor:'grey'} }} />}) }
								iconPosition="end"
							/>
						))}
					</TabList>
				</Box>
				<TabPanel value="1">
					<div>
						<Button
							variant="contained"
							onClick={handleClickOpen}
							sx={{
								display: "block",
								marginLeft: "Auto",
								marginRight: "20px",
								marginTop: "20px",
								marginBottom: "20px",
							}}
						>
							Add New
						</Button>
					</div>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>Admin Registration Form</DialogTitle>
						<IconButton
							aria-label="close"
							onClick={handleClose}
							sx={{
								position: "absolute",
								right: 8,
								top: 8,
								color: (theme) => theme.palette.grey[500],
							}}
						>
							<CloseIcon />
						</IconButton>
						<DialogContent>
							<form onSubmit={handleSubmit}>
								<FormControl>
									<TextField
										required
										name="title"
										size="small"
										label="Title of Business"
										onChange={handleChange}
									/>
									<Stack
										direction="row"
										useFlexGap
										spacing={2}
									>
										<TextField
											required
											name="firstName"
											size="small"
											label="Owner FN"
											margin="normal"
											onChange={handleChange}
										/>
										<TextField
											required
											name="lastName"
											size="small"
											label="Owner LN"
											margin="normal"
											onChange={handleChange}
										/>
									</Stack>
									<Stack
										direction="row"
										useFlexGap
										spacing={2}
									>
										<TextField
											name="email"
											size="small"
											label="Email"
											margin="normal"
											onChange={handleChange}
										/>
										<TextField
											required
											name="phone"
											size="small"
											label="Phone"
											margin="normal"
											onChange={handleChange}
										/>
									</Stack>
									<TextField
										name="address1"
										size="small"
										label="Address 1"
										margin="normal"
										onChange={handleChange}
									/>
									<TextField
										name="address2"
										size="small"
										label="Address 2"
										margin="normal"
										onChange={handleChange}
									/>
									<TextField
										name="license"
										size="small"
										label="License"
										margin="normal"
										onChange={handleChange}
									/>
									<Stack
										direction="row"
										useFlexGap
										spacing={2}
									>
										<TextField
											name="gst"
											size="small"
											label="GST"
											margin="normal"
											onChange={handleChange}
										/>
										<TextField
											name="cst"
											size="small"
											label="CST"
											margin="normal"
											onChange={handleChange}
										/>
									</Stack>
									<Stack
										direction="row"
										useFlexGap
										spacing={2}
									>
										<Typography
											variant="subtitle1"
											gutterBottom
											sx={{
												color: "rgba(0, 0, 0, 0.6)",
												paddingTop: "7px",
												marginRight: "70px",
											}}
										>
											Experience
										</Typography>
										<RadioGroup
											name="experience"
											value={value}
											onChange={handleRadioChange}
											row
										>
											<FormControlLabel
												value="yes"
												control={<Radio />}
												label="Yes"
											/>
											<FormControlLabel
												value="no"
												control={<Radio />}
												label="No"
											/>
										</RadioGroup>
									</Stack>
									{value === "yes" && (
										<TextField
											name="description"
											size="small"
											margin="normal"
											label="Description"
											onChange={handleChange}
										/>
									)}
									<TextField
										label="NOC from PS"
										margin="normal"
										name="nocText"
										size="small"
										value={nocFileName}
										onClick={() => {
											handleClick(nocRef);
										}}
										InputProps={{
											endAdornment: (
												<IconButton>
													<CloudUploadIcon />
													<input
														ref={nocRef}
														type="file"
														hidden
														onChange={(e) => {
															handleUpload(e);
														}}
														name="noc"
													/>
												</IconButton>
											),
										}}
									/>
									<TextField
										label="ID Proof"
										margin="normal"
										name="idProofText"
										size="small"
										value={idPrFileName}
										onClick={() => {
											handleClick(idPrRef);
										}}
										InputProps={{
											endAdornment: (
												<IconButton>
													<CloudUploadIcon />
													<input
														ref={idPrRef}
														type="file"
														hidden
														onChange={(e) => {
															handleUpload(e);
														}}
														name="idProof"
													/>
												</IconButton>
											),
										}}
									/>
									<TextField
										name="howDidYouKnow"
										size="small"
										label="How Did you know about us?"
										margin="normal"
										onChange={handleChange}
									/>
									<TextField
										name="bankActDetails"
										size="small"
										label="Bank Account Details"
										margin="normal"
										onChange={handleChange}
									/>
									<Button
										variant="contained"
										type="submit"
										sx={{ marginTop: "15px" }}
									>
										Submit
									</Button>
								</FormControl>
							</form>
						</DialogContent>
					</Dialog>
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
						<AdminTable data={data} createNewTab={createNewTab} />
					)}
				</TabPanel>
				{panels.map(panel => (
					<TabPanel key={panel.value} value={panel.value}>
						{panel.child()}
					</TabPanel>
				))}
				
			</TabContext>
		</div>
	);
};

export default AdminList;
