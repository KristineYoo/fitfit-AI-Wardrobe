//Made by Iain Gore 4/25/25
//Mod by Iain Gore 5/1/25
//Mod by Iain Gore 5/2/25

import axios from 'axios';
import { useState } from "react";
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import FitRecWindow from '../components/FitRecWindow'
import Typewriter from '../components/Typewriter';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


export function Recomend() {
    const [inputValue, setInputValue] = useState('');
    const [rec, setRecs] = useState([])
    const [loadingR, setLoadingR] = useState(true);
    const [done, setDone] = useState(true)
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(inputValue);
      setDone(false)
      setRecs([])
      setLoadingR(true)
      const data={"prompt": inputValue}
      setInputValue('')
        axios.post("/api/recommend/", data)
          .then((res) => {
            console.log(res.data); // Log for debugging
            setRecs(res.data.fits || []); // Assuming the response is like { items: [...] }
            console.log(rec)
            setLoadingR(false)
            setDone(true)

          })
          .catch((err) => console.log(err));
    }

  }
    

    
    return (
        <Box sx={{bgcolor:"#f5f5f5", height:"130vh",  justifyContent: 'center',
          alignItems: 'center'}}>
            <Typography variant="h1" sx={{p:2, color:"primary.main"}}>Find a Fit!</Typography>
            <Tooltip title="Enter your prompt here and hit enter to get your recommended fit" placement="right">
            <IconButton>
            <QuestionMarkIcon/>
            </IconButton>
            </Tooltip>
            <Box
        component="form"
        sx={{ '& > :not(style)': { mt: 5, width: '100ch' , height: '10ch', bgcolor:"background.main"} }}
      >
        <TextField 
        id="prompt box" 
        value={inputValue} 
        onChange={(event) => setInputValue(event.target.value)} 
        label="Enter Prompt" 
        variant="outlined" 
        fullWidth  
        onKeyUp={handleKeyPress} 
        multiline
        color="primary"
        
        />
      </Box>
      {done==false && <Typography sx={{color:"black"}}> <Typewriter texts={["Loading your items", "Pulling weather data", "Compling your fits"]} speed={100}></Typewriter></Typography>}
      {loadingR==false && <FitRecWindow recs={rec}/>}
        </Box>
    )


}