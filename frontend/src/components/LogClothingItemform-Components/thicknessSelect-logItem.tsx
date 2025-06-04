
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ThicknessSelectProps {
    value: string;
    onChange: (thickness: string) => void; // Changed from onThicknessChange to match usage
}

const thicknessOptions = [
    { value: 'mesh', label: 'Mesh' },
    { value: 'thin', label: 'Thin' },
    { value: 'medium', label: 'Medium' },
    { value: 'thick', label: 'Thick' },
    { value: 'very thick', label: 'Very Thick' },
];

export default function ThicknessSelect({ value, onChange }: ThicknessSelectProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 400, my: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="thickness-select-label">Select Thickness</InputLabel>
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
