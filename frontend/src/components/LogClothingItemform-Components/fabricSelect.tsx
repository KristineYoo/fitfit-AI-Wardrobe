
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, } from '@mui/material/Select';
import Chip from '@mui/material/Chip';


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

const fabricList = [
    'Cotton',
    'Linen',
    'Wool',
    'Silk',
    'Hemp',
    'Ramie',
    'Alpaca',
    'Cashmere',
    'Mohair',
    'Angora',
    'Polyester',
    'Nylon',
    'Acrylic',
    'Spandex',
    'Rayon',
    'Modal',
    'Tencel',
    'Polypropylene',
    'Poly-Cotton',
    'Tri-Blend',
    'Wool Blend',
    'Silk Blend',
    'Linen Blend',
    'Denim',
    'Twill',
    'Corduroy',
    'Velvet',
    'Suede',
    'Satin',
    'Chiffon',
    'Organza',
    'Lace',
    'Mesh',
    'Fleece',
    'Jersey',
    'Terrycloth',
    'Neoprene',
    'Gore-Tex',
];

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

    const handleChange = (event: SelectChangeEvent<typeof selectedFabrics>) => {
        const value = event.target.value;
        onFabricChange(typeof value === "string" ? value.split(",") : value);
    };

    const handleDelete = (fabricToDelete: string) => (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent Select from opening
        onFabricChange(selectedFabrics.filter((fabric) => fabric !== fabricToDelete));
    };

    return (
        <FormControl sx={{ my: 2, width: 400 }}>
            <InputLabel>Select Fabric</InputLabel>
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
