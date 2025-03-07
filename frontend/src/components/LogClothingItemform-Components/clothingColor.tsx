import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

interface ColorOption {
    label: string;
    hex: string;
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

const colorOptions: ColorOption[] = [
    { label: 'Red', hex: '#FF0000' },
    { label: 'Green', hex: '#00FF00' },
    { label: 'Blue', hex: '#0000FF' },
    { label: 'Yellow', hex: '#FFFF00' },
    { label: 'Magenta', hex: '#FF00FF' },
    { label: 'Cyan', hex: '#00FFFF' },
    { label: 'White', hex: '#FFFFFF' },
    { label: 'Black', hex: '#000000' },
    { label: 'Orange', hex: '#FFA500' },
    { label: 'Purple', hex: '#800080' },
    { label: 'Brown', hex: '#964B00' },
    { label: 'Gray', hex: '#808080' },
    { label: 'Light Gray', hex: '#C0C0C0' },
    { label: 'Pink', hex: '#FFC0CB' },
    { label: 'Dark Green', hex: '#008000' },
    { label: 'Indigo', hex: '#4B0082' },
    { label: 'Gold', hex: '#FFD700' },
    { label: 'Maroon', hex: '#A52A2A' },
    { label: 'Deep Sky Blue', hex: '#00BFFF' },
    { label: 'Hot Pink', hex: '#FF69B4' },
];

function getStyles(name: string, selectedLabels: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedLabels.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

interface ColorSelectorProps{
    onColorChange: (color: string[]) => void;
}
export default function ColorSelector({ onColorChange }: ColorSelectorProps) {
    const theme = useTheme();
    const [selectedLabels, setSelectedLabels] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof selectedLabels>) => {
        const {
            target: { value },
        } = event;
        setSelectedLabels(
            typeof value === 'string' ? value.split(',') : value,
        );
        onColorChange(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ my: 2, width: 400 }}>
                <InputLabel id="color-selector-label">Select Colors</InputLabel>
                <Select
                    labelId="color-selector-label"
                    id="color-selector"
                    multiple
                    value={selectedLabels}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Colors" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((label) => (
                                <Chip
                                    key={label}
                                    label={label}
                                    style={{
                                        backgroundColor: colorOptions.find(color => color.label === label)?.hex,
                                        color: colorOptions.find(color => color.label === label)?.hex === '#FFFFFF' || colorOptions.find(color => color.label === label)?.hex === '#C0C0C0' ? '#000000' : '#FFFFFF'
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {colorOptions.map((color) => (
                        <MenuItem
                            key={color.label}
                            value={color.label}
                            style={getStyles(color.label, selectedLabels, theme)}
                        >
                            <Box
                                component="span"
                                sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: color.hex,
                                    marginRight: 1,
                                    display: 'inline-block'
                                }}
                            />
                            {color.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
