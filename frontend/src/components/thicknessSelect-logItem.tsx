import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ThicknessSelect() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 400, my: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Thickness</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Mesh</MenuItem>
                    <MenuItem value={2}>Thin</MenuItem>
                    <MenuItem value={3}>Medium</MenuItem>
                    <MenuItem value={4}>Thick</MenuItem>
                    <MenuItem value={5}>Very Thick</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
