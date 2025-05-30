// Modified by Bao Vuong 7:07PM 5/10/2025
// Modified by Bao Vuong 11:19AM 5/12/2025
// Modified by Bao Vuong 11:12PM 5/28/2025

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ThicknessSelectProps {
    value: string;
    onChange: (thickness: string) => void; // Changed from onThicknessChange to match usage
}

export default function ThicknessSelect({ value, onChange }: ThicknessSelectProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };
    const [thicknessOptions, setThicknessOptions] = useState<{ value: string; label: string }[]>([]);
    useEffect(() => {
        axios.get('/api/option', { params: { type: 'thickness' } })
            .then((res) => {
                const options = res.data.map((option: { value: string; label: string }) => ({
                    value: option.value,
                    label: option.label,
                }));
                setThicknessOptions(options);
            })
            .catch((err) => console.error('Failed to fetch thickness options:', err));
    }, []);
    return (
        <Box sx={{ width: '100%', my: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="thickness-select-label"  sx={{backgroundColor: 'white', paddingRight: '4px'}}>Select Thickness</InputLabel>
                <Select
                    labelId="thickness-select-label"
                    id="thickness-select"
                    value={value}
                    label="Thickness"
                    onChange={handleChange}
                >
                    {thicknessOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
