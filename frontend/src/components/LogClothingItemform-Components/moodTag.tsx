// Modified by Bao VUong 7:07PM 5/10/2025
// Modified by Bao Vuong 11:19AM 5/12/2025
// Modified by Bao Vuong 11:12PM 5/28/2025

import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface MoodTagListProps {
    selectedMoods: string[];
    onChange: (moods: string[]) => void;
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

function getStyles(name: string, selectedMoods: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedMoods.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function MoodTagList({ selectedMoods, onChange }: MoodTagListProps) {
    const theme = useTheme();
    const [moodTags, setMoodTags] = useState<string[]>([]);
    useEffect(() => {
        axios.get('/api/option', { params: { type: 'moodTag' } })
            .then(res => {
                const options = res.data.map((option: { label: string }) => option.label);
                setMoodTags(options);
            })
            .catch(err => console.error('Failed to fetch mood tags:', err));
    }, []);

    const handleChange = (event: SelectChangeEvent<typeof selectedMoods>) => {
        const value = event.target.value;
        onChange(typeof value === 'string' ? value.split(',') : value);
    };

    const handleDelete = (moodToDelete: string) => (event: React.MouseEvent) => {
        event.stopPropagation();
        onChange(selectedMoods.filter(mood => mood !== moodToDelete));
    };

    return (
        <FormControl sx={{ my: 2, width: '100%' }}>
            <InputLabel  sx={{backgroundColor: 'white', paddingRight: '4px'}}>Select Mood</InputLabel>
            <Select
                multiple
                value={selectedMoods}
                onChange={handleChange}
                input={<OutlinedInput label="Chip" />}
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
                {moodTags.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, selectedMoods, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
