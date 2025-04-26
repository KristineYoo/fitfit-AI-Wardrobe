import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState } from "react";
import { useNavigate} from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');


    if (!username || !password) {
        setError('Please fill in all fields.');
        return;
    }

    setLoading(true);
    try {
        const response = await fetch('/api/login', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            setSuccess('Login successful!')
            setUsername('')
            setPassword('')
            sessionStorage.setItem("login", "True")
            window.location.assign("/#/")
            window.location.reload()
        } else {
            setError(data.message || 'Login failed.')
            setUsername('')
            setPassword('')
        }
    } catch (err) {
        setError('An error occurred. Please try again.')
        setUsername('')
        setPassword('')
    } finally {
        setLoading(false);
        
    }
};
  

     
     return (
      <Box
          sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              bgcolor: '#f5f5f5'
          }}
      >
          <Box
              sx={{
                  width: 300,
                  p: 4,
                  bgcolor: 'white',
                  borderRadius: 2,
                  boxShadow: 3
              }}
          >
              <Typography variant="h5" align="center" mb={3} color="black">
                  Login
              </Typography>

              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

              <form onSubmit={handleLogin}>
                  <TextField
                      fullWidth
                      label="Username"
                      variant="outlined"
                      margin="dense"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      autoComplete="username"
                  />
                  <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      margin="dense"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete="new-password"
                  />

                  <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      disabled={loading}
                      sx={{
                          mt: 2,
                          bgcolor: '#8AA899',
                          '&:hover': {
                              bgcolor: '#a0b8ac'
                          }
                      }}
                  >
                      {loading ? 'Loging in....' : 'Login'}
                  </Button>
              </form>

              <Typography variant="body2" align="center" mt={2} color="black">
                  Don't have an account? <Button href="/#/register" variant="text" size="small" sx={{ color: '#8AA899' }}>Register</Button>
              </Typography>
          </Box>
      </Box>
  );
  }
