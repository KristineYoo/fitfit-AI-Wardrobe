// Modified by Bao Vuong, 5/2/2025 11:43AM
// Modified by Bao VUong, 5/2/2025 12:26PM

import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate} from 'react-router-dom';
import SplitAuthLayout from '../components/SplitAuthLayout';
import CheckroomIcon from '@mui/icons-material/Checkroom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);
        axios.put('/api/auth/login', {
            username,
            password,
        })
        .then(response => {
            setSuccess('Login successful!')
            setUsername('')
            setPassword('')
            sessionStorage.setItem("login", "True")
            navigate("/home")
            console.log(response.data)
        })
        .catch(error => {
            console.log(error.response.data)
            if (error.response.status === 401) {
                setError('Invalid username or password.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        })
        .finally(() => {
            setLoading(false)
        });
    }

     
  return (
      <SplitAuthLayout>
        <Box
          textAlign="center"
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CheckroomIcon
            sx={{ fontSize: 44, color: 'primary.darker', mr: 1 }}
          />
          <Typography variant="h4" fontWeight="bold" color="primary.darker">
            FitFit
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: 'primary.lighter',
            p: 2,
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600} color="primary.dark">
            Welcome back!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Log in to manage your wardrobe and discover outfit inspiration.
          </Typography>
        </Box>

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
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            {loading ? 'Logging in....' : 'LOGIN'}
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}
          sx={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontWeight: 400,
            color: 'text.primary',
          }}
        >
          Don’t have an account? {" "}
          <Box
              component="a"
              href="/#/register"
              sx={{
                color: 'primary.dark',
                fontWeight: 500,
                ml: 0.5,
                textDecoration: 'none',
                fontSize: '0.95rem',
                letterSpacing: '0.1px',
                transition: 'color 0.2s ease',
                '&:hover': {
                    color: 'secondary.main',
                    textDecoration: 'underline',
                },
              }}
          >
              Register
          </Box>
        </Typography>
      </SplitAuthLayout>
  );
}
