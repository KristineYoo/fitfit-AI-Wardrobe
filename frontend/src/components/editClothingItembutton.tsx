
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function editButton() {
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <Button variant="contained" size="small">
                    Edit
                </Button>
            </div>
        </Box>
    );
}
