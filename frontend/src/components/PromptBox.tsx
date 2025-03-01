import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import axios from 'axios';
import React from "react";


export default function PromptBox() {

    const [inputValue, setInputValue] = useState('');

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    
        if (e.key === "Enter") {
          console.log(inputValue);
          const data={"text": inputValue}
          axios.post("http://localhost:5000/api/post-prompt", data)
          setInputValue('')
           
        }

    }

    return (
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
    );
  }

