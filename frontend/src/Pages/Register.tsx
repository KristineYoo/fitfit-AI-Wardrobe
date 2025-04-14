
import { Box, TextField, Button, Typography } from '@mui/material';

const RegisterPage = () => {
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

                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    margin="dense"
                />


                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 2,
                        bgcolor: '#8AA899',
                        '&:hover': {
                            bgcolor: '#a0b8ac'
                        }
                    }}
                >
                    Register
                </Button>

                <Typography variant="body2" align="center" mt={2} >
                    Have an account? <Button variant="text" size="small" sx={{ color: '#8AA899' }}>Login</Button>
                </Typography>
            </Box>
        </Box>
    );
};

export default RegisterPage;
