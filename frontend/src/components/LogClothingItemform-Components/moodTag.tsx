
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import data from '../../data/logItemsFormData.json';

interface FormData {
    clothingTypes: { value: number; label: string }[];
    currencies: { value: string; label: string }[];
    moodTags: string[];
    stylingTags: string[]
    occasionTags: string[]
}
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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}
interface MoodTagProps {
    onMoodChange: (style: string[]) => void;
}

export default function MoodTagList({ selectedMoods, onChange }: MoodTagListProps, { onMoodChange }: MoodTagProps) {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof selectedMoods>) => {
        const {
            target: { value },
        } = event;
        const newSelectedMoods = typeof value === 'string' ? value.split(',') : value;
        onChange(newSelectedMoods);
        onMoodChange(
            typeof value === 'string' ? value.split(',') : value
        );
    };


    const moodTags = (data as FormData).moodTags;

    return (
        <div>
            <FormControl sx={{ my: 2, width: 400 }}>
                <InputLabel id="demo-multiple-chip-label">Select Mood</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedMoods}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {moodTags.map((name: string) => (
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
        </div>
    );
}
