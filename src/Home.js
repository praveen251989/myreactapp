import React from "react";
import { Button} from "@mui/material";


const Home = () => {
	return (
		<div>
			<div className="wfrow marginTop">
				<Button variant="contained" href="/admin">
					Admin
				</Button>
				<Button variant="contained" href="/user">
					User
				</Button>
				
			</div>
			<div className="wfrow marginTop">
        <Button variant="contained" href="/employee">
					Employee
				</Button>
				<Button variant="contained" href="/reports">
					Reports
				</Button>
			</div>
			<div className="wfrow marginTop">
      <Button variant="contained" href="/analytics">
					Analytics
				</Button>
				<Button variant="contained" href="/quizzlet">
					Quizzlet
				</Button>
			</div>
      <div className="wfrow marginTop">
				<Button variant="contained" href="/configuration">
					Configuration
				</Button>
			</div>
      
		</div>
	);
};

export default Home;
