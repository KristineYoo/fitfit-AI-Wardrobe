
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';

export default function editButton() {
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <Fab size="small">
                    Edit
                </Fab>
            </div>
        </Box>
    );
}
