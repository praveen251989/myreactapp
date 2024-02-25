import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from "../config/firebase";
import TextField from '@mui/material/TextField';

const Events = (props) => {

  const [textData, setTextData] = useState('');
  const {targetE} = props;

  const handleTextChange = (event) => {
		setTextData(event.target.value);
  };

  const saveEvent = async() => {
    await setDoc(doc(db, "Events", `${textData}`), 
    {
      name:`${textData}`
    }
  );
  }
  return (
    <div>
      <TextField
					label={`Enter ${targetE}`}
					variant="outlined"
					value={textData}
					onChange={(e) => handleTextChange(e)}
          onblur={saveEvent}
			/>
    </div>
  )
}

export default Events