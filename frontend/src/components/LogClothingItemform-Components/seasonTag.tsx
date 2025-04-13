import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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

const seasonTags = [
    'Spring',
    'Summer',
    'Autumn',
    'Winter',
];

function getStyles(name: string, selectedSeasons: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedSeasons.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function SeasonTagList({ selectedSeasons, onChange }: SeasonTagListProps) {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof selectedSeasons>) => {
        const value = event.target.value;
        onChange(typeof value === 'string' ? value.split(',') : value);
    };

    const handleDelete = (seasonToDelete: string) => (event: React.MouseEvent) => {
        event.stopPropagation();
        onChange(selectedSeasons.filter(season => season !== seasonToDelete));
    };

    return (
        <FormControl sx={{ my: 2, width: 400 }}>
            <InputLabel>Select Season</InputLabel>
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
