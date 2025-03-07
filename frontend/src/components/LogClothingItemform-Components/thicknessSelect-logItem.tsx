import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ThicknessSelectProps {
    onThicknessChange: (thickness: string) => void;
}
export default function ThicknessSelect({ onThicknessChange} : ThicknessSelectProps) {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
        onThicknessChange(event.target.value as string);
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
                    <MenuItem value={'mesh'}>Mesh</MenuItem>
                    <MenuItem value={'thin'}>Thin</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'thick'}>Thick</MenuItem>
                    <MenuItem value={'very thick'}>Very Thick</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
