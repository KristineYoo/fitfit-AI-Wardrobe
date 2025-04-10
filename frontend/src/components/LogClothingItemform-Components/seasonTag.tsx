
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

interface SeasonTagProps {
    onSeasonChange: (season: string[]) => void;
}

export default function SeasonTagList({ onSeasonChange }: SeasonTagProps, { selectedSeasons, onChange }: SeasonTagListProps) {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof selectedSeasons>) => {
        const {
            target: { value },
        } = event;
        const newSelectedSeasons = typeof value === 'string' ? value.split(',') : value;
        onChange(newSelectedSeasons);
        onSeasonChange(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ my: 2, width: 400 }}>
                <InputLabel id="season-multiple-chip-label">Select Season</InputLabel>
                <Select
                    labelId="season-multiple-chip-label"
                    id="season-multiple-chip"
                    multiple
                    value={selectedSeasons}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-season-chip" label="Season" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
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
        </div>
    );
}
