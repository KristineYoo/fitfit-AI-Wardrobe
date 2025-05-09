//Made by Iain Gore 4/25/25
//Most recent mod: Iain Gore 5/4/25

import axios from 'axios';
import { useState } from "react";
import { Box, TextField, Typography } from '@mui/material'
import FitRecWindow from '../components/FitRecWindow'
import Typewriter from '../components/Typewriter';


export function Recomend() {
    const [inputValue, setInputValue] = useState('');
    const [rec, setRecs] = useState([])
    const [clicked, setClicked] = useState(false);
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

    const handleFocus=()=>{
      setClicked(true)
    }

    const handleBlur=()=>{
      setClicked(false)
    }

    
    return (
      <div style={{ backgroundColor: '#f5f5f5', height:'100vh'}}>
        <div style={{ backgroundColor: '#f5f5f5'}}>
            <Typography variant="h1" sx={{p:2, color:"primary.main"}}>Find a Fit!</Typography>
            <Box
        component="form"
        sx={{ '& > :not(style)': { mt: 5, width: '100vw' , height: '10ch', bgcolor:"background.main"} }}
      >

        <TextField 
        hiddenLabel
        id="prompt box"
        value={inputValue} 
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(event) => setInputValue(event.target.value)} 
        label={(!clicked && <Typewriter texts=
          {
          ["I need an formal outfit for an interview", 
          "I need a pink themed outfit for a pool party", 
          "Outfit with a chill vibe", "Recommend me an outfit that goes with a sun tatoo", 
          "Cottage core mixed with light academina ", "I want to look like a knight in shining board shorts"]
        } speed={50}></Typewriter>) 
        || clicked && "Enter prompt"}
        variant="outlined" 
        onKeyUp={handleKeyPress} 
        multiline
        color="primary"
        
        />
      </Box>
      <Box
      sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
      {done==false && <Typography sx={{color:"black"}}> <Typewriter texts={["Loading your items", "Pulling weather data", "Compling your fits"]} speed={50}></Typewriter></Typography>}
      {loadingR==false && <FitRecWindow recs={rec}/>}
      </Box>
        </div>
      </div>
    )


}