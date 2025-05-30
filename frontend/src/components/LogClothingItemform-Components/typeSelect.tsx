// Modified by Bao Vuong 7:07PM 5/10/2025
// Modified by Bao Vuong 11:19AM 5/12/2025
// Modified by Bao Vuong 11:12PM 5/28/2025

import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Define interfaces for props and JSON structure
interface TypeSelectProps {
    value: string;
    onChange: (category: string) => void;
}

interface ClothingType {
    value: number;
    label: string;
}

interface LogItemsFormData {
    clothingTypes: ClothingType[];
}

const TypeSelect: React.FC<TypeSelectProps> = ({ value, onChange }) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };
    const [formData, setFormData] = useState<LogItemsFormData>({ clothingTypes: [] });
    useEffect(() => {
        axios.get('/api/option', { params: { type: 'category' } })
            .then((res) => {
                const clothingTypes = res.data.map((option: { value: number; label: string }) => ({
                    value: option.value,
                    label: option.label,
                }));
                setFormData({ clothingTypes });
            })
            .catch((err) => console.error('Failed to fetch clothing types:', err));
    }, []);
    return (
        <Box sx={{ minWidth: '100%', my: 1 }}>
            <FormControl fullWidth>
                <InputLabel id="selectType-logClothing-label" sx={{backgroundColor: 'white', paddingRight: '4px'}}>Select Category</InputLabel>
                <Select
                    labelId="selectType-logClothing-label"
                    id="selectType-logClothing"
                    value={value}
                    label="Category"
                    onChange={handleChange}
                >
                    {formData.clothingTypes.map((type) => (
                        <MenuItem key={type.value} value={type.label.toLowerCase()}>
                            {type.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default TypeSelect;
