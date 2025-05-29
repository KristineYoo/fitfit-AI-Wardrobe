// Modified by Bao VUong 7:07PM 5/10/2025
// Modified by Bao Vuong 11:19AM 5/12/2025
// Modified by Bao Vuong 11:12PM 5/28/2025

import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {useEffect, useState} from 'react';
import axios from 'axios';

interface FabricSelectProps {
    selectedFabrics: string[];
    onChange: (fabrics: string[]) => void;
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

function getStyles(name: string, selectedFabrics: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedFabrics.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

interface FabricSelectProps {
    onFabricChange: (fabric: string[]) => void;
}



export default function FabricSelect({ selectedFabrics, onFabricChange }: FabricSelectProps) {
    const theme = useTheme();
    const [fabricList, setFabricList] = useState<string[]>([]);
    useEffect(() => {
        axios.get('/api/option', { params: { type: 'material' } })
            .then((res) => {
                const labels = res.data.map((option: { label: string }) => option.label);
                setFabricList(labels);
            })
            .catch((err) => console.error('Failed to fetch fabric options:', err));
    }, []);
    const handleChange = (event: SelectChangeEvent<typeof selectedFabrics>) => {
        const value = event.target.value;
        onFabricChange(typeof value === "string" ? value.split(",") : value);
    };

    const handleDelete = (fabricToDelete: string) => (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent Select from opening
        onFabricChange(selectedFabrics.filter((fabric) => fabric !== fabricToDelete));
    };

    return (
        <FormControl sx={{ my: 2, width: '100%' }}>
            <InputLabel  sx={{backgroundColor: 'white', paddingRight: '4px'}}>Select Fabric</InputLabel>
            <Select
                multiple
                value={selectedFabrics}
                onChange={handleChange}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                onDelete={handleDelete(value)}
                                onClick={(e) => e.stopPropagation()} // Prevent menu open
                                onMouseDown={(e) => e.stopPropagation()} // Critical for delete
                            />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {fabricList.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, selectedFabrics, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
