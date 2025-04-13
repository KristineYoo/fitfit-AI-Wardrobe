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
    stylingTags: string[];
    occasionTags: string[];
}

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
    const stylingTags = (data as FormData).stylingTags;

    const handleChange = (event: SelectChangeEvent<typeof selectedStyles>) => {
        const value = event.target.value;
        onChange(typeof value === 'string' ? value.split(',') : value);
    };

    const handleDelete = (styleToDelete: string) => (event: React.MouseEvent) => {
        event.stopPropagation();
        onChange(selectedStyles.filter(style => style !== styleToDelete));
    };

    return (
        <FormControl sx={{ my: 2, width: 400 }}>
            <InputLabel>Select Styles</InputLabel>
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
