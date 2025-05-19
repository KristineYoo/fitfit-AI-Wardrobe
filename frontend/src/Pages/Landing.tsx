// frontend/src/Pages/Landing.tsx
// Last changed by Bao Vuong, 6:29PM 4/26/2025

import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import FitRecWindow from '../components/FitRecWindow'
import { Fit, Item } from '../types/jsonDataTypes'
import mascot from "backend/public/assets/data/images/mascot.jpg"

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

    
    return (
        <Container sx={{height: "100vh", color:"#f5f5f5"}}>
          <Typography variant="h1" sx={{color:"primary.main"}}>Welcome to Fitfit</Typography>
        { (sessionStorage.getItem("login")=="False" || sessionStorage.getItem("login")==null) && <Button href="/#/login">Login</Button>}
        </Container>
    )
}
