import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import data from '../../data/logItemsFormData.json';

interface ClothingType {
    value: number;
    label: string;
}

interface TypeSelectProps {
    onCategoryChange: (category: string) => void;
}

export default function TypeSelect({ onCategoryChange }: TypeSelectProps) {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
        onCategoryChange(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 400, my: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="selectType-logClothing-Input">Select Type</InputLabel>
                <Select
                    labelId="selectType-logClothing-label"
                    id="selectType-logClothing"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    {data.clothingTypes.map((type: ClothingType) => (
                        <MenuItem key={type.value} value={String(type.value)}>
                            {type.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
