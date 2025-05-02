//Made by Iain Gore 4/25/25
//Mod by Iain Gore 5/1/25
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { Box, Container, Paper, TextField, Typography } from '@mui/material'
import FitRecWindow from '../components/FitRecWindow'
import Typewriter from '../components/Typewriter';


export function Recomend() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  // loading is true at the beginning until data is fetched from the backend
    const [inputValue, setInputValue] = useState('');
    const [rec, setRecs] = useState([])
    const [loadingR, setLoadingR] = useState(true);
    const [done, setDone] = useState(true)

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        console.log(inputValue);
        setDone(false)
        setRecs([])
        const data={"prompt": inputValue}
        setInputValue('')
          axios.post("/api/recommend", data)
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
    
    useEffect(() => {
        axios.get('/api/relevantItems')
            .then((res) => {
                console.log(res.data);
                setData(res.data.items || []);
                setLoading(false);  // Set loading to false after data is fetched
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);  // Stop loading even if there's an error
            });
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>; 
    }

    
    return (
        <Box sx={{bgcolor:"#f5f5f5", height:"130vh",  justifyContent: 'center',
          alignItems: 'center'}}>
            <Typography variant="h1" sx={{p:2, color:"primary.main"}}>Find a Fit!</Typography>
            <Box
        component="form"
        sx={{ '& > :not(style)': { mt: 5, width: '100ch' , height: '10ch', bgcolor:"background"} }}
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
      {done==false && <Typography sx={{color:"black"}}> <Typewriter texts={["Hello There", "How are you", "this is the last"]} speed={100}></Typewriter></Typography>}
      {loadingR==false && <FitRecWindow recs={rec}/>}
        </Box>
    )


}