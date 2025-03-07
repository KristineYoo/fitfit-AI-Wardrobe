import {Paper, Grid2, Typography, Box, TextField} from '@mui/material';
import { FitThumbnail } from './FitThumbnail';
import { Fit } from '../types/jsonDataTypes';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function FitRecWindow( {recs} : {recs:Fit[]} ) {

  const [inputValue, setInputValue] = useState('');
  const [rec, setRecs] = useState([])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  
      if (e.key === "Enter") {
        console.log(inputValue);
        const data={"text": inputValue}
        setInputValue('')
        useEffect(() => {
          axios.post("/api/recommend", data)
            .then((res) => {
              console.log(res.data); // Log for debugging
              setRecs(res.data.items || []); // Assuming the response is like { items: [...] }
            })
            .catch((err) => console.log(err));
        }, []);
      }

  }
  
  return (
      <Paper 
        elevation={5} 
        sx={{pl:3, pr:3, pt:1, pb:1, m:2, width:'100%'}}
      >
        <Typography 
          variant="h3" 
          sx={{
            p:2,
            pb:4,
            color: 'primary',
            fontWeight: 'bold',
            letterSpacing: 1.5,
            textAlign: 'center'
          }}
        >
          Recommended Fits
        </Typography>
        <Grid2 container spacing={4}>
          {
            recs.map((rec:Fit, i:number) => (
              <Grid2 size={{xs:12, sm:6, md:4, xl:3}}>
                <FitThumbnail rec={rec} key={"fitThumbnail"+i}/>
              </Grid2>
            ))
          }
        </Grid2>
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
  );
}