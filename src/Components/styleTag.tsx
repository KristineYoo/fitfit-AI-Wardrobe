import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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

const stylingTags = [
    'Formal',
    'Semi-Formal',
    'Business Casual',
    'Casual',
    'Lounge',
    'Athleisure',
    'Slim Fit',
    'Regular Fit',
    'Oversized',
    'Tailored',
    'Cropped',
    'High-Waisted',
    'Buttons',
    'Zipper',
    'Pockets',
    'Belted',
    'Hooded',
    'Ruffled',
    'Embroidered',
    'Solid',
    'Striped',
    'Plaid',
    'Floral',
    'Polka Dot',
    'Graphic',
    'Abstract',
    'Layered',
    'Turtleneck',
    'V-Neck',
    'Crew Neck',
    'Off-Shoulder',
    'Halter Neck',
    'Collared',
    'Sleeveless',
    'Short-Sleeved',
    'Long-Sleeved',
    'Bell Sleeves',
    'Puff Sleeves',
    'Backless',
    'Cut-Out',
    'Slit',
    'Wrap Style',
    'Pleated',
    'Fringed',
    'Sheer',
    'Lace Detail',
    'Mesh',
    'Ruched',
    'Cinched Waist',
    'Asymmetrical',
    'Double-Breasted',
    'Single-Breasted',
    'Peplum',
    'Fitted',
    'Relaxed Fit',
    'Wide-Leg',
    'Skinny Fit',
    'Bootcut',
    'Tapered',
    'Straight Leg',
    'Cuffed',
    'Distressed',
    'Frayed Hem',
    'Cargo Style',
    'Drawstring',
    'Elastic Waist',
    'High-Rise',
    'Mid-Rise',
    'Low-Rise',
    'Quilted',
    'Faux Fur',
    'Studded',
    'Beaded',
    'Sequined',
    'Glittery',
    'Shimmer',
    'Matte Finish',
    'Glossy Finish',
    'Reversible',
    'Convertible',
    'Snap Closure',
    'Tie Closure',
    'Buckled',
    'Draped',
    'Patchwork',
    'Monogrammed',
    'Vintage',
    'Minimalist',
    'Bohemian',
    'Edgy',
    'Sporty',
    'Streetwear',
    'Y2K',
    'Preppy',
    'Gothic',
    'Cottagecore',
    'Retro',
    'Military Style'
];


function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function SelectStyleTagList() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ my: 2, width: 400 }}>
                <InputLabel id="demo-multiple-chip-label">Select Styles</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
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
                    {stylingTags.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}