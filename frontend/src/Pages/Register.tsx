// frontend/src/Pages
// 4-26-25 Mod Sophia Somers
// Last changed by Bao Vuong, 6:30PM 4/26/2025
// Modified by Bao Vuong, 5/2/2025 11:48AM

import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import SplitAuthLayout from '../components/SplitAuthLayout';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import axios from 'axios';

    const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();


    // form submission handling
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      
      // password and username
      if (!username || !password || !confirmPassword) {
        setError('Please fill in all fields.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      // api
      setLoading(true);
      axios.post('/api/auth/register', {
        username,
        password,
      })
      .then(response => {
        setSuccess('Registration successful! You can now log in.');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
        if (error.response.status === 400) {
          setError('Username already exists.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      })
      .finally(() => {
        setLoading(false);
      })
    }
    // frontend
    return (
      <SplitAuthLayout>
          <Box
            textAlign="center"
            mb={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CheckroomIcon sx={{ fontSize: 44, color: 'primary.darker', mr: 1 }} />
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
              Join the community!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create an account to track your wardrobe and receive personalized outfit suggestions.
            </Typography>
          </Box>
  
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
  
          <form onSubmit={handleRegister}>
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="dense"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                mt: 2,
                bgcolor: 'primary.main', //'#8AA899',
                color: 'primary.contrastText',
                fontWeight: 600,
                '&:hover': {
                  //color: 'secondary.main',
                  bgcolor: 'primary.dark' //'#a0b8ac'
                }
              }}
            >
                {loading ? 'Registering...' : 'REGISTER'}
            </Button>
          </form>
  
        <Typography variant="body2" align="center" mt={2}
          sx={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontWeight: 400,
            color: 'text.primary',
          }}
        >
            Already have an account?{' '}
            <Box
                component="a"
                href="/#/login"
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
                Log in
            </Box>
        </Typography>
      </SplitAuthLayout>
    );
  };
  
  export default RegisterPage;
  