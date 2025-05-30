// Modified by Bao Vuong 7:07PM 5/10/2025
// Modified by Bao Vuong 11:19AM 5/12/2025
// Modified by Bao Vuong 10:55 5/28/2025

import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface SelectStyleTagListProps {
    selectedStyles: string[];
    onChange: (styles: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, selectedStyles: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedStyles.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function SelectStyleTagList({ selectedStyles, onChange }: SelectStyleTagListProps) {
    const theme = useTheme();
    const [stylingTags, setStylingTags] = useState<string[]>([]);

    useEffect(() => {
        axios.get('/api/option', { params: { type: 'styleTag' } })
            .then(res => {
                const labels = res.data.map((option: { label: string }) => option.label);
                setStylingTags(labels);
            })
            .catch(err => console.error('Failed to fetch styling tags:', err));
    }, []);

    const handleChange = (event: SelectChangeEvent<typeof selectedStyles>) => {
        const value = event.target.value;
        onChange(typeof value === 'string' ? value.split(',') : value);
    };

    const handleDelete = (styleToDelete: string) => (event: React.MouseEvent) => {
        event.stopPropagation();
        onChange(selectedStyles.filter(style => style !== styleToDelete));
    };

    return (
        <FormControl sx={{ my: 2, width: '100%' }}>
            <InputLabel  sx={{backgroundColor: 'white', paddingRight: '4px'}}>Select Styles</InputLabel>
            <Select
                multiple
                value={selectedStyles}
                onChange={handleChange}
                input={<OutlinedInput label="Styles" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                onDelete={handleDelete(value)}
                                onClick={(e) => e.stopPropagation()}
                                onMouseDown={(e) => e.stopPropagation()}
                            />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {stylingTags.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, selectedStyles, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
