// Modified by Bao Vuong 7:07PM 5/10/2025
// Modified by Bao Vuong 11:19AM 5/12/2025
// Modified by Bao Vuong 11:12PM 5/28/2025

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useEffect } from 'react';
import axios from 'axios';

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
    const [colorOptions, setColorOptions] = React.useState<ColorOption[]>([]);

    useEffect(() => {
        axios.get('/api/option', { params: { type: 'color' }})
            .then(res => {
                const options = res.data.map((option: { label: string, hex: string }) => ({
                    label: option.label,
                    hex: option.hex,
                }));
                setColorOptions(options);
            })
            .catch(err => console.error('Failed to fetch color options:', err));
    }, []);

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
            <FormControl sx={{ my: 2, width: '100%' }}>
                <InputLabel id="color-selector-label"  sx={{backgroundColor: 'white', paddingRight: '4px'}}>Select Colors</InputLabel>
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
                                        color: '#000',
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
