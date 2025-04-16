import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Optional: Hash password before sending (using a library like bcryptjs)
    //import bcrypt from 'bcryptjs';
    //const hashedPassword = bcrypt.hashSync(password, 10);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');


        if (!username || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
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
                setSuccess('Registration successful! You can now log in.');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setError(data.message || 'Registration failed.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
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
                <Typography variant="h5" align="center" mb={3}>
                    Register for FitFit
                </Typography>

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
                            bgcolor: '#8AA899',
                            '&:hover': {
                                bgcolor: '#a0b8ac'
                            }
                        }}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </form>

                <Typography variant="body2" align="center" mt={2} >
                    Have an account? <Button variant="text" size="small" sx={{ color: '#8AA899' }}>Login</Button>
                </Typography>
            </Box>
        </Box>
    );
};

export default RegisterPage;
