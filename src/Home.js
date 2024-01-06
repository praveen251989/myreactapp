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
				

				{/* <Grid container spacing={2} >
        <Grid xs={6}>
          <Button variant="contained" href="/admin">
            Admin
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button variant="contained" href="/user">
            User
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button variant="contained" href="/employee">
          Employee
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button variant="contained" href="/reports">
          Reports
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button variant="contained" href="/analytics">
          Analytics
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button variant="contained" href="/quizzlet">
            Quizzlet
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button variant="contained" href="/configuration">
          Configuration
          </Button>
        </Grid>
      </Grid>       */}
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
