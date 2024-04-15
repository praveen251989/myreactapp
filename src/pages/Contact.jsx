import React, { useState, useEffect } from "react";
import {
	Stack,
	RadioGroup,
	FormControlLabel,
	Radio,
	Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Contact = (props) => {
    const [value, setValue] = useState('yes');
    const spacing = 8;
    const {name} = props;
    const [contactInfo, setContactInfo] = useState({});
    useEffect(() => {
        getContact();
    }, []);
    const getContact = async() => {
        const docRef = doc(db, "admin-users", name);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setContactInfo(docSnap.data());
            //console.log("Document data:", contactInfo.title);
        } else {
            console.log("No such document!");
        }
    }
	return (
		<div>
			<TextField
				name="title"
				label="Title of Business"
                InputProps={{readOnly: true}}
                defaultValue={contactInfo.title}
			/>
			<Stack direction="row" useFlexGap spacing={spacing}>
				<TextField
					name="firstName"
					label="Owner FN"
					margin="normal"
				/>
				<TextField
					name="lastName"
					label="Owner LN"
					margin="normal"
				/>
			</Stack>
			<Stack direction="row" useFlexGap spacing={spacing}>
				<TextField
					name="email"
					label="Email"
					margin="normal"
				/>
				<TextField
					name="phone"
					label="Phone"
					margin="normal"
				/>
			</Stack>
            <Stack direction="row" useFlexGap spacing={spacing}>
                <TextField
                    name="address1"
                    label="Address 1"
                    margin="normal"
                />
                <TextField
                    name="address2"
                    label="Address 2"
                    margin="normal"
                />
            </Stack>
			<TextField
				name="license"
				label="License"
				margin="normal"
			/>
			<Stack direction="row" useFlexGap spacing={spacing}>
				<TextField
					name="gst"
					label="GST"
					margin="normal"
				/>
				<TextField
					name="cst"
					label="CST"
					margin="normal"
				/>
			</Stack>
			<Stack direction="row" useFlexGap spacing={2}>
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
            <Stack direction="row" useFlexGap spacing={spacing}>
            <TextField
                name="description"
                margin="normal"
                label="Description"
            />
			<TextField
				name="bankActDetails"
				label="Bank Account Details"
				margin="normal"
			/>
            </Stack>
		</div>
	);
};

export default Contact;
