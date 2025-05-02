// frontend/src/Pages/Landing.tsx
// Last changed by Bao Vuong, 6:29PM 4/26/2025

import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { Box, Container, Paper, TextField, Typography } from '@mui/material'
import FitRecWindow from '../components/FitRecWindow'
import { Fit, Item } from '../types/jsonDataTypes'

export function Landing(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  // loading is true at the beginning until data is fetched from the backend
    const [inputValue, setInputValue] = useState('');
  const [rec, setRecs] = useState([])
  const [loadingR, setLoadingR] = useState(true);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  
      if (e.key === "Enter") {
        console.log(inputValue);
        const data={"prompt": inputValue}
        setInputValue('')
          axios.post("/api/recommend/", data)
            .then((res) => {
              console.log(res.data); // Log for debugging
              setRecs(res.data.fits || []); // Assuming the response is like { items: [...] }
              console.log(rec)
              setLoadingR(false)

            })
            .catch((err) => console.log(err));
      }

  }
    
    useEffect(() => {
        axios.get('/api/item/')
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

    const all_items = data as Item[];
    console.log(all_items[0])
    const fit1: Fit = {
        items: [all_items[0], all_items[3], all_items[4]],
        tags: ["cute", "pink", "casual"]
    };

    const fit2: Fit = {
        items: [all_items[2], all_items[5]],
        tags:["clean","simple","casual","chill"]
    };

    var fit_recs:Fit[] = [fit1, fit2]
    
    return (
        <Container sx={{height: "50vh"}}>
            <Typography variant="h1" sx={{p:2}}>Welcome to Fitfit!</Typography>
            <Paper 
        elevation={5} 
        sx={{pl:3, pr:3, pt:1, pb:1, m:2, width:'100%'}}
      >
        { loadingR==false && <FitRecWindow recs={rec}/>}
            <Box
        component="form"
        sx={{ '& > :not(style)': { m: 5, width: '100ch' , height: '10ch'} }}
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
      </Paper>
        </Container>
    )
}
