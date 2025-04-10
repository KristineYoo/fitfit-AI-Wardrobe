
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

interface OccasionTagListProps {
    selectedOccasions: string[];
    onChange: (occasions: string[]) => void;
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


function getStyles(name: string, selectedOccasions: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedOccasions.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}
interface OccasionSelectProps {
    onOccasionChange: (occasion: string[]) => void;
}

export default function OccasionTagList({ selectedOccasions, onChange }: OccasionTagListProps, { onOccasionChange }: OccasionSelectProps) {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof selectedOccasions>) => {
        const {
            target: { value },
        } = event;
        const newSelectedOccasions = typeof value === 'string' ? value.split(',') : value;
        onChange(newSelectedOccasions);
        onOccasionChange(
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    const occasionTags = (data as FormData).occasionTags;


    return (
        <div>
            <FormControl sx={{ my: 2, width: 400 }}>
                <InputLabel id="demo-multiple-chip-label">Select Occasion</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedOccasions}
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
                    {occasionTags.map((name: string) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, selectedOccasions, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}