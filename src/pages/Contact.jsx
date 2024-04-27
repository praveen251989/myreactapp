import React, { useState, useEffect } from "react";
import {
	Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Contact = (props) => {
	const spacing = 8;
	const { name } = props;
	const [contactInfo, setContactInfo] = useState({});
	useEffect(() => {
		getContact();
	}, []);
	const getContact = async () => {
		const docRef = doc(db, "admin-users", name);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			setContactInfo(docSnap.data());
		} else {
			alert("No such document!");
		}
	};
	return (
		<div>
			<TextField
				name="title"
				label="Title of Business"
				InputProps={{ readOnly: true }}
				defaultValue=" "
				value={contactInfo.title}
			/>
			<Stack direction="row" useFlexGap spacing={spacing}>
				<TextField
					name="firstName"
					label="Owner FN"
					margin="normal"
					defaultValue=" "
					value={contactInfo.firstName}
					InputProps={{ readOnly: true }}
				/>
				<TextField
					name="lastName"
					label="Owner LN"
					margin="normal"
					defaultValue=" "
					value={contactInfo.lastName}
					InputProps={{ readOnly: true }}
				/>
			</Stack>
			<Stack direction="row" useFlexGap spacing={spacing}>
				<TextField
					name="email"
					label="Email"
					margin="normal"
					defaultValue=" "
					value={contactInfo.email}
					InputProps={{ readOnly: true }}
				/>
				<TextField
					name="phone"
					label="Phone"
					margin="normal"
					defaultValue=" "
					value={contactInfo.phone}
					InputProps={{ readOnly: true }}
				/>
			</Stack>
			<Stack direction="row" useFlexGap spacing={spacing}>
				<TextField
					name="address1"
					label="Address 1"
					margin="normal"
					defaultValue=" "
					value={contactInfo.address1}
					InputProps={{ readOnly: true }}
				/>
				<TextField
					name="address2"
					label="Address 2"
					margin="normal"
					defaultValue=" "
					value={contactInfo.address2}
					InputProps={{ readOnly: true }}
				/>
			</Stack>
			<TextField
				name="license"
				label="License"
				margin="normal"
				defaultValue=" "
				value={contactInfo.license}
				InputProps={{ readOnly: true }}
			/>
			<Stack direction="row" useFlexGap spacing={spacing}>
				<TextField
					name="gst"
					label="GST"
					margin="normal"
					defaultValue=" "
					value={contactInfo.gst}
					InputProps={{ readOnly: true }}
				/>
				<TextField
					name="cst"
					label="CST"
					margin="normal"
					defaultValue=" "
					value={contactInfo.cst}
					InputProps={{ readOnly: true }}
				/>
			</Stack>
			{/* <Stack direction="row" useFlexGap spacing={2}>
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
					value={contactInfo.experience}
					row
					InputProps={{ readOnly: true }}
				>
					<FormControlLabel
						value="yes"
						control={<Radio InputProps={{ readOnly: true }} />}
						label="Yes"
					/>
					<FormControlLabel
						value="no"
						control={<Radio InputProps={{ readOnly: true }} />}
						label="No"
					/>
				</RadioGroup>
			</Stack> */}
			<Stack direction="row" useFlexGap spacing={spacing}>
				<TextField
					name="description"
					margin="normal"
					label="Description"
					defaultValue=" "
					value={contactInfo.description}
					InputProps={{ readOnly: true }}
				/>
				<TextField
					name="bankActDetails"
					label="Bank Account Details"
					margin="normal"
					defaultValue=" "
					value={contactInfo.bankActDetails}
					InputProps={{ readOnly: true }}
				/>
			</Stack>
		</div>
	);
};

export default Contact;
