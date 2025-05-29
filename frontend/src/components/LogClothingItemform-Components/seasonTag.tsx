// Modified by Bao Vuong 7:07PM 5/10/2025
// Modified by Bao Vuong 11:19AM 5/12/2025
// Modified by Bao Vuong 11:12PM 5/28/2025

import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';

interface SeasonTagListProps {
    selectedSeasons: string[];
    onChange: (seasons: string[]) => void;
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

function getStyles(name: string, selectedSeasons: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedSeasons.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function SeasonTagList({ selectedSeasons, onChange }: SeasonTagListProps) {
    const theme = useTheme();
    const [seasonTags, setSeasonTags] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/option?type=season')
            .then((res) => res.json())
            .then((data) => {
                const labels = data.map((option: { label: string }) => option.label);
                setSeasonTags(labels);
            })
            .catch((err) => console.error('Failed to fetch season tags:', err));
    }, []);
    const handleChange = (event: SelectChangeEvent<typeof selectedSeasons>) => {
        const value = event.target.value;
        onChange(typeof value === 'string' ? value.split(',') : value);
    };

    const handleDelete = (seasonToDelete: string) => (event: React.MouseEvent) => {
        event.stopPropagation();
        onChange(selectedSeasons.filter(season => season !== seasonToDelete));
    };

    return (
        <FormControl sx={{ my: 2, width: '100%' }}>
            <InputLabel sx={{backgroundColor: 'white', paddingRight: '4px'}}>Select Season</InputLabel>
            <Select
                multiple
                value={selectedSeasons}
                onChange={handleChange}
                input={<OutlinedInput label="Season" />}
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
                {seasonTags.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, selectedSeasons, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
