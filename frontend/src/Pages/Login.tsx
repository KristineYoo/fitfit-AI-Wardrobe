import { Alert, Box, Button, Container, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState } from "react";
import { useNavigate} from 'react-router-dom';

export function Login() {
   const [userInputValue, setUserInputValue] = useState('');
   const [passInputValue, setPassInputValue] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();
  

   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
     
         if (e.key === "Enter") {
           console.log(userInputValue);
           console.log(passInputValue);
           const data={"username": userInputValue, "password": passInputValue}
           setUserInputValue('')
           setPassInputValue('')
             axios.put("/api/login", data)
               .then((res) => {
                 console.log(res.data); // Log for debugging
                 sessionStorage.setItem("login", "True")
               })
               .catch((err) => setError("incorrect username or password"));
         }
   
     }
     
    return (
       <Container sx={{height: "50vh"}}>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Paper
        elevation={5}
        sx={{ pl: 3, pr: 3, pt: 1, pb: 1, m: 2, width: '100%' }}>
           <Box
        component="form"
        sx={{ '& > :not(style)': { m: 5, width: '100ch' , height: '10ch'} }}
      >
        <TextField 
        id="User Name" 
        value={userInputValue} 
        onChange={(event) => setUserInputValue(event.target.value)} 
        label="User Name" 
        variant="outlined" 
        fullWidth  
        onKeyUp={handleKeyPress} 
        multiline
        color="primary"
        
        />
      </Box>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 5, width: '100ch' , height: '10ch'} }}
      >
        <TextField 
        id="Password" 
        value={passInputValue} 
        onChange={(event) => setPassInputValue(event.target.value)} 
        label="Password" 
        variant="outlined" 
        type="password"
        fullWidth  
        onKeyUp={handleKeyPress} 
        color="primary"
        
        />
      </Box>
        </Paper>
        <Button 
        variant="contained"
        onClick={() => {
          console.log(userInputValue);
           console.log(passInputValue);
           const data={"username": userInputValue, "password": passInputValue}
           setUserInputValue('')
           setPassInputValue('')
             axios.put("/api/login", data)
               .then((res) => {
                 console.log(res.data); // Log for debugging
                 sessionStorage.setItem("login", "True")
                 navigate('/#/');
               })
               .catch((err) => console.log(err));
        }}
        >
          Login
        </Button>
        <Button
        href="/#/register"
        variant="contained"
        >Register</Button>
        </Container>
    )
  }
