import {useContext, useState} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import BarChartIcon from '@mui/icons-material/BarChart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import QuizIcon from '@mui/icons-material/Quiz';
import AdminList from "./admin/AdminList";
import Configuration from "./pages/configuration";
import { AuthContext } from "./context/AuthContext";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';
import HomePage from "./pages/HomePage";


const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const Home = () => {
	const [open, setOpen] = useState(true);
	const [anchorEl, setAnchorEl] = useState(null);
	const [content, setContent] = useState('homepage');
	const { dispatch } = useContext(AuthContext);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch({ type: "LOGOUT", payload: null });
		setAnchorEl(null);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpen(!open)}
						edge="start"
						sx={{
							marginRight: 1,							
						}}
					>
						<MenuIcon />
					</IconButton>
					<MonetizationOnIcon fontSize="large"/>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1 ,marginLeft: '5px'}}
					>
						Quizzlet
					</Typography>
					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader/>
				<List>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}
						onClick={() => setContent('homepage')}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText
							primary="Home"
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}
						onClick={() => setContent('admin')}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText
							primary="Admin"
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}
						onClick={() => setContent('user')}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<AccountCircleIcon />
						</ListItemIcon>
						<ListItemText
							primary="User"
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}
						onClick={() => setContent('employee')}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>							
							<BadgeIcon />
						</ListItemIcon>
						<ListItemText
							primary="Employee"
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}

						onClick={() => setContent('reports')}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<BarChartIcon />
						</ListItemIcon>
						<ListItemText
							primary="Reports"
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}

						onClick={() => setContent('analytics')}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<QueryStatsIcon />
						</ListItemIcon>
						<ListItemText
							primary="Analytics"
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}

						onClick={() => setContent('quizzlet')}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<QuizIcon />
						</ListItemIcon>
						<ListItemText
							primary="Quizzlet"
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}
						onClick={()=> setContent('configuration')}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText
							primary="Configuration"
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3,marginTop:'50px' }}>
				{content === 'homepage' && <HomePage/>}				
				{content === 'admin' && <AdminList/> }
				{content === 'configuration' && <Configuration/> }
			</Box>
		</Box>
	);
};

export default Home;
